#![cfg_attr(not(feature = "std"), no_std)]
#![feature(is_some_with)]

use ink_lang as ink;
use ink_storage::traits::{PackedLayout, SpreadLayout};

#[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode, Copy, Clone)]
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

    type CanvasId = u64;
    type TokenId = u128;
    type Result<T> = core::result::Result<T, Error>;

    /// Event emitted when a token transfer occurs.
    #[ink(event)]
    pub struct Transfer {
        #[ink(topic)]
        from: Option<AccountId>,
        #[ink(topic)]
        to: Option<AccountId>,
        #[ink(topic)]
        id: TokenId,
    }

    /// Event emitted when a token approve occurs.
    #[ink(event)]
    pub struct Approval {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        approved: AccountId,
        #[ink(topic)]
        id: TokenId,
    }

    /// Event emitted when an operator is enabled or disabled for an owner.
    /// The operator can manage all NFTs of the owner.
    #[ink(event)]
    pub struct ApprovalForAll {
        #[ink(topic)]
        owner: AccountId,
        #[ink(topic)]
        operator: AccountId,
        approved: bool,
    }

    #[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    pub enum State {
        New(AccountId),
        Edited,
        Minted(AccountId),
    }

    /// Event emitted when a new canvas is created|edited|minted
    #[ink(event)]
    pub struct CanvasStatus {
        #[ink(topic)]
        canvas_id: CanvasId,
        state: State,
    }

    /// Event emitted when the color of token_id is updated
    #[ink(event)]
    pub struct TokenColor {
        #[ink(topic)]
        token_id: TokenId,
        color: Colors,
    }

    /// Event emitted when a user outbids earlier owner and becomes the new owner
    #[ink(event)]
    pub struct TokenCaptured {
        #[ink(topic)]
        token_id: TokenId,
        #[ink(topic)]
        from: AccountId,
        #[ink(topic)]
        by: AccountId,
        color: Option<Colors>,
    }

    #[derive(scale::Encode, scale::Decode, Debug, PartialEq, Eq, Copy, Clone)]
    #[cfg_attr(feature = "std", derive(scale_info::TypeInfo))]
    pub enum Error {
        /// Caller does not have the required permissions
        Unauthorised,
        /// The operation's required conditions are not satisfied
        NotAllowed,
        /// Required funds were not received
        InsufficientFunds,
        /// End time should be greater than start time
        InvalidDuration,
        /// Given canvas-id has not yet been created
        CanvasNotFound,
        /// Given token-id doesn't exist
        TokenNotFound,
        /// Dimension of canvas cannot be zero
        ZeroDimensions,
    }

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

    #[ink(storage)]
    #[derive(SpreadAllocate)]
    pub struct CreativeNft {
        /// Account id which deployed the contract.
        /// It has access to withdraw the fees collected from canvas creation
        owner: AccountId,
        /// It is the minimum fees a user needs to pay to create a new canvas
        creation_fees: Balance,
        /// It is the number of canvases created so far
        canvas_nonce: CanvasId,
        /// Mapping from `canvas_id` to its readonly metadata.
        /// @note It can be updated before the auction starts
        canvas_details: Mapping<CanvasId, Canvas>,
        /// It stores the participation data and status of each canvas
        canvas_analytics: Mapping<CanvasId, CanvasStats>,
        /// Mapping from `token_id` to its data (owner, color, value)
        grids: Mapping<TokenId, Cell>,
        /// It stores whether an accounts has participated in a given canvas auction
        participants: Mapping<(CanvasId, AccountId), ()>,
        /// Mapping of users to their cumulative value of monetary
        /// interactions on our platform. Value: (spent, received)
        cash_flow: Mapping<AccountId, (Balance, Balance)>,
        /// Mapping from owner to list of owned tokens.
        /// @dev (owner, 0) stores the count of owned tokens
        owned_tokens: Mapping<(AccountId, u128), TokenId>,
        /// Mapping from token to the index of the owner tokens list
        owned_tokens_index: Mapping<TokenId, u128>,
        /// Mapping from token to approved account
        token_approvals: Mapping<TokenId, AccountId>,
        /// Mapping from owner to operator approvals
        operator_approvals: Mapping<(AccountId, AccountId), ()>,
    }

    /// Concats (canvas_id, cord_x, cord_y) and store it as TokenId (u128)
    #[inline]
    fn encode(canvas_id: CanvasId, cord_x: u8, cord_y: u8) -> TokenId {
        1_000_000 * TokenId::from(canvas_id) + 1000 * TokenId::from(cord_x) + TokenId::from(cord_y)
    }

    /// Breaks the token id into (CanvasId, cord_X, cord_Y)
    fn decode(id: TokenId) -> (CanvasId, u8, u8) {
        let canvas_id: CanvasId = (id / 1_000_000).try_into().unwrap();
        let cord_x: u8 = ((id / 1000) % 1000).try_into().unwrap();
        let cord_y: u8 = (id / 1000).try_into().unwrap();
        (canvas_id, cord_x, cord_y)
    }

    impl CreativeNft {
        /// Creates a new auction place with the minimum canvas creation fees as @fees
        #[ink(constructor)]
        pub fn new(fees: Balance) -> Self {
            ink_lang::utils::initialize_contract(|contract: &mut Self| {
                contract.owner = Self::env().caller();
                contract.creation_fees = fees;
            })
        }

        /// PRIVILEGED Call. Owner can change the min. fees for future canvases
        #[ink(message)]
        pub fn update_creation_fees(&mut self, new_fees: Balance) -> Result<()> {
            self.only_owner()?;
            self.creation_fees = new_fees;
            Ok(())
        }

        /// PRIVILEGED Call. Owner can claim some portion of fees collected so far
        #[ink(message)]
        pub fn collect_fees(&mut self, acc: AccountId, val: Balance) -> Result<()> {
            self.only_owner()?;
            if val > self.env().balance() {
                return Err(Error::InsufficientFunds);
            }
            self.env().transfer(acc, val).expect("transfer failed");
            Ok(())
        }

        /// PAYABLE Call. Creates a new canvas room.
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
        ) -> Result<CanvasId> {
            if self.env().transferred_value() < self.creation_fees {
                return Err(Error::InsufficientFunds);
            }
            if dimensions.0 == 0 || dimensions.1 == 0 {
                return Err(Error::ZeroDimensions);
            }
            if start_time >= end_time {
                return Err(Error::InvalidDuration);
            }

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
                    self.grids.insert(&encode(canvas_id, x, y), &cell);
                }
            }
            self.canvas_nonce += 1;

            // update the spending of caller to account for the canvas creation fees
            let (mut spent, receive) = self.cash_flow.get(&caller).unwrap_or_default();
            spent += self.env().transferred_value();
            self.cash_flow.insert(&caller, &(spent, receive));

            self.env().emit_event(CanvasStatus {
                canvas_id,
                state: State::New(caller),
            });

            Ok(canvas_id)
        }

        /// Creator can make changes in the contract metadata before the start_time of auction
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
        ) -> Result<()> {
            let canvas = self.get_canvas_details(canvas_id)?;

            if self.env().block_timestamp() >= canvas.start_time {
                return Err(Error::NotAllowed);
            }

            let start_time = new_start_time.unwrap_or(canvas.start_time);
            let end_time = new_end_time.unwrap_or(canvas.end_time);
            if start_time >= end_time {
                return Err(Error::InvalidDuration);
            }

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

            self.env().emit_event(CanvasStatus {
                canvas_id,
                state: State::Edited,
            });
            Ok(())
        }

        #[ink(message)]
        pub fn mint_canvas(&mut self, canvas_id: CanvasId) -> Result<()> {
            let canvas = self.get_canvas_details(canvas_id)?;

            let mut stats = self.canvas_analytics.get(&canvas_id).unwrap_or_default();

            if stats.minted || canvas.end_time >= self.env().block_timestamp() {
                return Err(Error::NotAllowed);
            }

            let grid = self.get_grid_details(canvas_id)?;
            grid.iter().enumerate().for_each(|(x, row)| {
                let x: u8 = x.try_into().unwrap();
                row.iter().enumerate().for_each(|(y, cell)| {
                    let y: u8 = y.try_into().unwrap();
                    let owner = cell.owner;
                    let idx = self.owned_tokens.get(&(owner, 0)).unwrap_or_default() + 1;
                    let token_id = encode(canvas_id, x, y);

                    self.owned_tokens.insert(&(owner, 0), &idx);
                    self.owned_tokens.insert(&(owner, idx), &token_id);
                    self.owned_tokens_index.insert(&token_id, &idx);

                    self.env().emit_event(Transfer {
                        from: Some(AccountId::from([0x0; 32])),
                        to: Some(owner),
                        id: token_id,
                    });
                });
            });

            stats.minted = true;
            self.canvas_analytics.insert(&canvas_id, &stats);

            self.env().emit_event(CanvasStatus {
                canvas_id,
                state: State::Minted(self.env().caller()),
            });
            Ok(())
        }

        #[ink(message, payable)]
        pub fn capture_cell(
            &mut self,
            canvas_id: CanvasId,
            cord_x: u8,
            cord_y: u8,
            color: Option<Colors>,
        ) -> Result<()> {
            let caller = self.env().caller();
            let canvas = self.get_canvas_details(canvas_id)?;

            if self.env().block_timestamp() > canvas.end_time {
                return Err(Error::NotAllowed);
            }

            let cell = self.get_cell_details(canvas_id, cord_x, cord_y)?;
            let price = cell.value * (100 + canvas.premium as u128) / 100;
            let bid = self.env().transferred_value();

            if bid < price {
                return Err(Error::InsufficientFunds);
            }

            self.env()
                .transfer(cell.owner, bid)
                .expect("transfer failed"); // Is Re-entrancy possible?

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

            let token_id = encode(canvas_id, cord_x, cord_y);
            self.grids.insert(&token_id, &ncell);

            self.env().emit_event(TokenCaptured {
                token_id,
                from: cell.owner,
                by: caller,
                color,
            });
            Ok(())
        }

        #[ink(message)]
        pub fn change_cell_color(
            &mut self,
            canvas_id: CanvasId,
            cord_x: u8,
            cord_y: u8,
            new_color: Colors,
        ) -> Result<()> {
            let canvas = self.get_canvas_details(canvas_id)?;

            if !canvas.is_dynamic && self.env().block_timestamp() > canvas.end_time {
                return Err(Error::NotAllowed);
            }
            self.change_color(canvas_id, cord_x, cord_y, &new_color);
            Ok(())
        }

        #[ink(message)]
        pub fn change_multiple_cells_color(
            &mut self,
            canvas_id: CanvasId,
            data: Vec<(u8, u8, Colors)>,
        ) -> Result<()> {
            let canvas = self.get_canvas_details(canvas_id)?;

            if !canvas.is_dynamic && self.env().block_timestamp() > canvas.end_time {
                return Err(Error::NotAllowed);
            }

            data.iter().for_each(|(cord_x, cord_y, new_color)| {
                self.change_color(canvas_id, *cord_x, *cord_y, new_color);
            });
            Ok(())
        }

        /// returns [contractOwner, canvasNonce, creationFees]
        #[ink(message)]
        pub fn get_game_details(&self) -> (AccountId, CanvasId, Balance) {
            (self.owner, self.canvas_nonce, self.creation_fees)
        }

        #[ink(message)]
        pub fn get_canvas_details(&self, canvas_id: CanvasId) -> Result<Canvas> {
            self.canvas_details
                .get(&canvas_id)
                .ok_or(Error::CanvasNotFound)
        }

        #[ink(message)]
        pub fn get_canvas_stats(&self, canvas_id: CanvasId) -> CanvasStats {
            self.canvas_analytics.get(&canvas_id).unwrap_or_default()
        }

        #[ink(message)]
        pub fn get_grid_details(&self, canvas_id: CanvasId) -> Result<Vec<Vec<Cell>>> {
            let canvas = self.get_canvas_details(canvas_id)?;

            let mut grid: Vec<Vec<Cell>> = Vec::new();
            grid.reserve_exact(canvas.dimensions.0.into());

            for x in 0..canvas.dimensions.0 {
                let mut row: Vec<Cell> = Vec::with_capacity(canvas.dimensions.1.into());
                for y in 0..canvas.dimensions.1 {
                    let cell = self.get_cell_details(canvas_id, x, y)?;
                    row.push(cell);
                }
                grid.push(row);
            }

            Ok(grid)
        }

        #[ink(message)]
        pub fn get_cell_details(
            &self,
            canvas_id: CanvasId,
            cord_x: u8,
            cord_y: u8,
        ) -> Result<Cell> {
            self.grids
                .get(&encode(canvas_id, cord_x, cord_y))
                .ok_or(Error::TokenNotFound)
        }

        #[ink(message)]
        pub fn get_user_created_canvas_ids(&self, acc: AccountId) -> Vec<CanvasId> {
            (0..self.canvas_nonce)
                .into_iter()
                .filter(|&id| {
                    self.get_canvas_details(id)
                        .is_ok_and(|canvas| canvas.creator == acc)
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

        /// returns (spent, received) of the given user. It is the cumulative value of
        /// monetary interactions done by a given user on the platform
        #[ink(message)]
        pub fn get_user_cash_flow(&self, acc: AccountId) -> (Balance, Balance) {
            self.cash_flow.get(&acc).unwrap_or_default()
        }

        #[ink(message)]
        pub fn get_user_nfts(&self, acc: AccountId) -> Vec<(CanvasId, u8, u8)> {
            let count = self.owned_tokens.get(&(acc, 0)).unwrap_or_default();

            (1..=count)
                .into_iter()
                .map(|x| decode(self.owned_tokens.get(&(acc, x)).unwrap()))
                .collect()
        }

        fn only_owner(&self) -> Result<()> {
            if self.env().caller() != self.owner {
                return Err(Error::Unauthorised);
            }
            Ok(())
        }

        fn change_color(
            &mut self,
            canvas_id: CanvasId,
            cord_x: u8,
            cord_y: u8,
            new_color: &Colors,
        ) {
            let mut cell = self
                .get_cell_details(canvas_id, cord_x, cord_y)
                .expect("cell not found");
            assert!(self.env().caller() == cell.owner, "Not Authorised");

            cell.color = Colors::color_code(new_color);
            let token_id = encode(canvas_id, cord_x, cord_y);
            self.grids.insert(&token_id, &cell);

            self.env().emit_event(TokenColor {
                token_id,
                color: *new_color,
            });
        }
    }

    /// ERC721 standard implemented here
    impl CreativeNft {
        #[ink(message)]
        pub fn balance_of(&self, owner: AccountId) -> u128 {
            self.owned_tokens.get(&(owner, 0)).unwrap_or_default()
        }

        #[ink(message)]
        pub fn owner_of(&self, id: TokenId) -> Option<AccountId> {
            let (canvas_id, cord_x, cord_y) = decode(id);
            match self.get_cell_details(canvas_id, cord_x, cord_y) {
                Ok(cell) => Some(cell.owner),
                Err(_) => None,
            }
        }

        #[ink(message)]
        pub fn get_approved(&self, id: TokenId) -> Option<AccountId> {
            self.token_approvals.get(&id)
        }

        #[ink(message)]
        pub fn is_approved_for_all(&self, owner: AccountId, operator: AccountId) -> bool {
            self.operator_approvals.contains(&(owner, operator))
        }

        #[ink(message)]
        pub fn set_approval_for_all(&mut self, to: AccountId, approved: bool) -> Result<()> {
            let caller = self.env().caller();
            if to == caller {
                return Err(Error::NotAllowed);
            }

            if approved {
                self.operator_approvals.insert(&(caller, to), &());
            } else {
                self.operator_approvals.remove(&(caller, to));
            }

            self.env().emit_event(ApprovalForAll {
                owner: caller,
                operator: to,
                approved,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn approve(&mut self, to: AccountId, id: TokenId) -> Result<()> {
            let caller = self.env().caller();

            if !self.approved_or_owner(caller, id) {
                return Err(Error::Unauthorised);
            }

            if to == AccountId::from([0x0; 32]) {
                self.token_approvals.remove(&id);
            } else if self.token_approvals.contains(&id) {
                return Err(Error::NotAllowed);
            } else {
                self.token_approvals.insert(&id, &to);
            }

            self.env().emit_event(Approval {
                owner: caller,
                approved: to,
                id,
            });

            Ok(())
        }

        #[ink(message)]
        pub fn transfer(&mut self, destination: AccountId, id: TokenId) -> Result<()> {
            let caller = self.env().caller();
            self.transfer_from(caller, destination, id)
        }

        #[ink(message)]
        pub fn transfer_from(&mut self, from: AccountId, to: AccountId, id: TokenId) -> Result<()> {
            let caller = self.env().caller();

            if !self.approved_or_owner(caller, id) {
                return Err(Error::Unauthorised);
            }

            self.token_approvals.remove(&id);

            // 1. Remove token from current owner
            let owner = self.owner_of(id).unwrap();
            let idx = self.owned_tokens_index.get(&id).unwrap();
            self.owned_tokens.remove(&(owner, idx));
            self.owned_tokens.insert(&(owner, 0), &(idx - 1));

            // 2. Add token to new owner
            let pos = self.owned_tokens.get(&(to, 0)).unwrap_or_default() + 1;
            self.owned_tokens_index.insert(&id, &pos);
            self.owned_tokens.insert(&(to, pos), &id);

            // 3. Update grid
            let (canvas_id, cord_x, cord_y) = decode(id);
            let mut cell = self.get_cell_details(canvas_id, cord_x, cord_y)?;
            cell.owner = to;
            self.grids.insert(&id, &cell);

            self.env().emit_event(Transfer {
                from: Some(from),
                to: Some(to),
                id,
            });
            Ok(())
        }

        fn approved_or_owner(&self, caller: AccountId, id: TokenId) -> bool {
            let owner = match self.owner_of(id) {
                Some(a) => a,
                None => return false,
            };

            if caller == AccountId::from([0x0; 32]) {
                return false;
            }

            caller == owner
                || self.token_approvals.get(&id) == Some(caller)
                || self.is_approved_for_all(owner, caller)
        }
    }
}
