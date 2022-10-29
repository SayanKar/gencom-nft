#![cfg_attr(not(feature = "std"), no_std)]
#![feature(is_some_with)]

use ink_lang as ink;

use ink_storage::traits::{PackedLayout, SpreadLayout};

#[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode)]
#[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
pub enum Colors {
    White,
    Platinum,
    Gray,
    Black,
    Pink,
    Red,
    Orange,
    Brown,
    Yellow,
    LightGreen,
    Green,
    Cyan,
    LightBlue,
    Blue,
    Lavender,
    Purple,
}

impl Colors {
    fn color_code(&self) -> u32 {
        match self {
            Self::White => 0xf8f8f8,
            Self::Platinum => 0xe4e4e4,
            Self::Gray => 0x888888,
            Self::Black => 0x222222,
            Self::Pink => 0xffa7d1,
            Self::Red => 0xe50000,
            Self::Orange => 0xe59500,
            Self::Brown => 0xa06a42,
            Self::Yellow => 0xe5d900,
            Self::LightGreen => 0x94e044,
            Self::Green => 0x02be01,
            Self::Cyan => 0x00d3dd,
            Self::LightBlue => 0x0083c7,
            Self::Blue => 0x0000ea,
            Self::Lavender => 0xcf6ee4,
            Self::Purple => 0x820080,
        }
    }
}

#[ink::contract]
mod creative_nft {
    use super::*;
    use ink_prelude::{string::String, vec::Vec};
    use ink_storage::{traits::SpreadAllocate, Mapping};

    type CanvasId = u128;

    #[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode, Clone)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    pub struct Cell {
        owner: AccountId,
        color: u32,
        value: Balance,
    }

    #[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    pub struct Canvas {
        creator: AccountId,
        title: String,
        desc: String,
        dimensions: (u8, u8),
        start_time: u64,
        end_time: u64,
        premium: u8,
        is_dynamic: bool,
    }

    #[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode, Default)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    pub struct CanvasStats {
        total_bids: u128,
        total_participants: u128,
        minted: bool,
    }

    // Similar to ERC1155
    #[ink(storage)]
    #[derive(SpreadAllocate)]
    pub struct CreativeNft {
        owner: AccountId,
        creation_fees: Balance,
        canvas_nonce: CanvasId,
        canvas_details: Mapping<CanvasId, Canvas>,
        canvas_analytics: Mapping<CanvasId, CanvasStats>,
        grids: Mapping<(CanvasId, u8, u8), Cell>,
        participants: Mapping<(CanvasId, AccountId), ()>,
        cash_flow: Mapping<AccountId, (Balance, Balance)>, // (spent, received)
        owned_tokens: Mapping<(AccountId, u128), (CanvasId, u8, u8)>, // (Account, index) -> (canvasId, x, y)
        owned_tokens_index: Mapping<(CanvasId, u8, u8), u128>,        // (canvasId,x,y) -> index
    }

    impl CreativeNft {
        #[ink(constructor)]
        pub fn new(fees: Balance) -> Self {
            ink_lang::utils::initialize_contract(|contract: &mut Self| {
                contract.owner = Self::env().caller();
                contract.creation_fees = fees;
            })
        }

        #[ink(message)]
        pub fn update_creation_fees(&mut self, new_fees: Balance) {
            assert_eq!(self.env().caller(), self.owner);
            self.creation_fees = new_fees;
        }

        #[ink(message)]
        pub fn collect_fees(&mut self, acc: AccountId, val: Balance) {
            assert!(self.owner == self.env().caller(), "Not Authorised");
            assert!(val <= self.env().balance(), "Value exceeds fees collected");
            self.env().transfer(acc, val).unwrap();
        }

        #[ink(message, payable)]
        pub fn create_canvas(
            &mut self,
            title: String,
            desc: String,
            dimensions: (u8, u8),
            start_time: u64,
            end_time: u64,
            base_price: Balance,
            premium: u8,
            is_dynamic: bool,
        ) -> CanvasId {
            assert!(
                self.env().transferred_value() >= self.creation_fees,
                "Insufficient fees sent"
            );
            assert!(
                dimensions.0 > 0 && dimensions.1 > 0,
                "Dimension should be greater than zero"
            );
            assert!(
                start_time < end_time,
                "End time should be greater than start time"
            );

            let caller = self.env().caller();
            let canvas_id = self.canvas_nonce;

            let canvas = Canvas {
                creator: caller,
                title,
                desc,
                dimensions,
                start_time,
                end_time,
                premium,
                is_dynamic,
            };
            self.canvas_details.insert(&canvas_id, &canvas);

            let cell = Cell {
                owner: caller,
                color: Colors::color_code(&Colors::White),
                value: base_price,
            };
            for x in 0..dimensions.0 {
                for y in 0..dimensions.1 {
                    self.grids.insert(&(canvas_id, x, y), &cell);
                }
            }
            self.canvas_nonce += 1;

            let (mut spent, receive) = self.cash_flow.get(&caller).unwrap_or_default();
            spent += self.env().transferred_value();
            self.cash_flow.insert(&caller, &(spent, receive));

            canvas_id
        }

        #[ink(message)]
        pub fn edit_canvas(
            &mut self,
            canvas_id: CanvasId,
            title: Option<String>,
            desc: Option<String>,
            new_start_time: Option<u64>,
            new_end_time: Option<u64>,
            premium: Option<u8>,
            is_dynamic: Option<bool>,
        ) {
            let canvas = self.get_canvas_details(canvas_id).unwrap();

            let start_time = new_start_time.unwrap_or(canvas.start_time);
            let end_time = new_end_time.unwrap_or(canvas.end_time);
            assert!(
                start_time < end_time,
                "End time should be greater than start time"
            );

            let ncanvas = Canvas {
                title: title.unwrap_or(canvas.title),
                desc: desc.unwrap_or(canvas.desc),
                premium: premium.unwrap_or(canvas.premium),
                is_dynamic: is_dynamic.unwrap_or(canvas.is_dynamic),
                start_time,
                end_time,
                ..canvas
            };

            self.canvas_details.insert(&canvas_id, &ncanvas);
        }

        #[ink(message)]
        pub fn mint_canvas(&mut self, canvas_id: CanvasId) {
            let canvas = self.canvas_details.get(&canvas_id).unwrap();
            assert!(
                canvas.end_time < self.env().block_timestamp(),
                "Painting phase isn't over yet"
            );

            let mut stats = self.canvas_analytics.get(&canvas_id).unwrap_or_default();
            assert!(stats.minted == false, "Canvas has already been minted");

            let grid = self.get_grid_details(canvas_id).unwrap();
            grid.iter().enumerate().for_each(|(x, row)| {
                let x: u8 = x.try_into().unwrap();
                row.iter().enumerate().for_each(|(y, cell)| {
                    let y: u8 = y.try_into().unwrap();
                    let owner = cell.owner;
                    let (mut idx, _, _) = self.owned_tokens.get(&(owner, 0)).unwrap_or_default();
                    idx += 1;

                    self.owned_tokens.insert(&(owner, 0), &(idx, 0, 0));
                    self.owned_tokens.insert(&(owner, idx), &(canvas_id, x, y));
                    self.owned_tokens_index.insert(&(canvas_id, x, y), &idx);
                });
            });

            stats.minted = true;
            self.canvas_analytics.insert(&canvas_id, &stats);
        }

        #[ink(message, payable)]
        pub fn capture_cell(
            &mut self,
            canvas_id: CanvasId,
            cord_x: u8,
            cord_y: u8,
            color: Option<Colors>,
        ) {
            let caller = self.env().caller();
            let canvas = self.get_canvas_details(canvas_id).unwrap();
            assert!(self.env().block_timestamp() <= canvas.end_time);

            let cell = self.get_cell_details(canvas_id, cord_x, cord_y).unwrap();
            let price = cell.value * (100 + canvas.premium as u128) / 100;
            let bid = self.env().transferred_value();

            assert!(bid >= price, "Insufficient bid amount");

            self.env().transfer(cell.owner, bid).unwrap(); // Is Re-entrancy possible?

            let (mut spent, receive) = self.cash_flow.get(&caller).unwrap_or_default();
            spent += bid;
            self.cash_flow.insert(&caller, &(spent, receive));

            let (spent, mut receive) = self.cash_flow.get(&cell.owner).unwrap_or_default();
            receive += bid;
            self.cash_flow.insert(&caller, &(spent, receive));

            let ncell = Cell {
                owner: caller,
                value: bid,
                color: color.map_or(cell.color, |c| Colors::color_code(&c)),
            };

            let mut stats = self.canvas_analytics.get(&canvas_id).unwrap_or_default();

            stats.total_bids += 1;
            stats.total_participants += match self
                .participants
                .insert_return_size(&(canvas_id, caller), &())
            {
                Some(_) => 0,
                None => 1,
            };

            self.canvas_analytics.insert(&canvas_id, &stats);
            self.grids.insert(&(canvas_id, cord_x, cord_y), &ncell);
        }

        fn _change_cell_color(
            &mut self,
            canvas_id: CanvasId,
            cord_x: u8,
            cord_y: u8,
            new_color: &Colors,
        ) {
            let mut cell = self.get_cell_details(canvas_id, cord_x, cord_y).unwrap();
            assert!(self.env().caller() == cell.owner, "Not Authorised");

            cell.color = Colors::color_code(new_color);
            self.grids.insert(&(canvas_id, cord_x, cord_y), &cell);
        }

        #[ink(message)]
        pub fn change_cell_color(
            &mut self,
            canvas_id: CanvasId,
            cord_x: u8,
            cord_y: u8,
            new_color: Colors,
        ) {
            let canvas = self.get_canvas_details(canvas_id).unwrap();
            assert!(canvas.is_dynamic || self.env().block_timestamp() <= canvas.end_time);
            self._change_cell_color(canvas_id, cord_x, cord_y, &new_color);
        }

        #[ink(message)]
        pub fn change_multiple_cells_color(
            &mut self,
            canvas_id: CanvasId,
            data: Vec<(u8, u8, Colors)>,
        ) {
            let canvas = self.get_canvas_details(canvas_id).unwrap();
            assert!(canvas.is_dynamic || self.env().block_timestamp() <= canvas.end_time);

            data.iter().for_each(|(cord_x, cord_y, new_color)| {
                self._change_cell_color(canvas_id, *cord_x, *cord_y, new_color);
            })
        }

        #[ink(message)]
        pub fn get_game_details(&self) -> (AccountId, CanvasId, Balance) {
            (self.owner, self.canvas_nonce, self.creation_fees)
        }

        #[ink(message)]
        pub fn get_canvas_details(&self, canvas_id: CanvasId) -> Option<Canvas> {
            self.canvas_details.get(&canvas_id)
        }

        #[ink(message)]
        pub fn get_canvas_stats(&self, canvas_id: CanvasId) -> CanvasStats {
            self.canvas_analytics.get(&canvas_id).unwrap_or_default()
        }

        #[ink(message)]
        pub fn get_grid_details(&self, canvas_id: CanvasId) -> Option<Vec<Vec<Cell>>> {
            let canvas = match self.get_canvas_details(canvas_id) {
                Some(r) => r,
                None => return None,
            };
            let mut grid: Vec<Vec<Cell>> = Vec::new();
            grid.reserve_exact(canvas.dimensions.0.into());

            for x in 0..canvas.dimensions.0 {
                let mut row: Vec<Cell> = Vec::with_capacity(canvas.dimensions.1.into());
                for y in 0..canvas.dimensions.1 {
                    let cell = self.get_cell_details(canvas_id, x, y).unwrap();
                    row.push(cell);
                }
                grid.push(row);
            }

            Some(grid)
        }

        #[ink(message)]
        pub fn get_cell_details(
            &self,
            canvas_id: CanvasId,
            cord_x: u8,
            cord_y: u8,
        ) -> Option<Cell> {
            self.grids.get(&(canvas_id, cord_x, cord_y))
        }

        #[ink(message)]
        pub fn get_user_created_canvas_ids(&self, acc: AccountId) -> Vec<CanvasId> {
            (0..self.canvas_nonce)
                .into_iter()
                .filter(|&id| {
                    self.get_canvas_details(id)
                        .is_some_and(|canvas| canvas.creator == acc)
                })
                .collect()
        }

        #[ink(message)]
        pub fn get_user_participated_canvas_ids(&self, acc: AccountId) -> Vec<CanvasId> {
            (0..self.canvas_nonce)
                .into_iter()
                .filter(|&id| self.participants.get(&(id, acc)).is_some())
                .collect()
        }

        #[ink(message)]
        pub fn get_user_cash_flow(&self, acc: AccountId) -> (Balance, Balance) {
            self.cash_flow.get(&acc).unwrap_or_default()
        }

        #[ink(message)]
        pub fn get_user_nfts(&self, acc: AccountId) -> Vec<(CanvasId, u8, u8)> {
            let (count, _, _) = self.owned_tokens.get(&(acc, 0)).unwrap_or_default();

            (1..=count)
                .into_iter()
                .map(|x| self.owned_tokens.get(&(acc, x)).unwrap())
                .collect()
        }

        #[ink(message)]
        pub fn get_owned_nft_count(&self, acc: AccountId) -> u128 {
            self.owned_tokens.get(&(acc, 0)).unwrap_or_default().0
        }
    }
}
