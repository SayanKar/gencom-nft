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

    type CanvasId = u32;
    type TokenId = u64;
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

    /// Event emitted when a new canvas is created
    #[ink(event)]
    pub struct CanvasCreated {
        #[ink(topic)]
        canvas_id: CanvasId,
        #[ink(topic)]
        creator: AccountId,
    }

    #[ink(event)]
    pub struct CanvasEdited {
        #[ink(topic)]
        canvas_id: CanvasId,
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
        /// End-time should be greater than current time
        InvalidEndtime,
        /// Given canvas-id has not yet been created
        CanvasNotFound,
        /// Given token-id doesn't exist
        TokenNotFound,
        /// No one has claimed the given token yet
        CellNotMinted,
        /// Dimension of canvas cannot be zero
        ZeroDimensions,
        /// Tokens from active auctions are locked
        TokenLocked,
        /// Cannot make changes post auction's start-time
        EditPhaseOver,
        /// Cannot bid on cells outside of auction phase
        NotAuctionPhase,
        /// You cannot recapture your own token cell
        CannotCaptureOwnToken,
    }

    #[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode, Clone, Default)]
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
        base_price: Balance,
        premium: u8,
        is_dynamic: bool,
    }

    #[derive(PackedLayout, SpreadLayout, scale::Encode, scale::Decode, Default)]
    #[cfg_attr(feature = "std", derive(::scale_info::TypeInfo))]
    pub struct CanvasStats {
        total_bids: u32,
        total_participants: u32,
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
        /// Mapping from owner to list of owned tokens in a given canvas
        /// @dev (owner, canvas_id, 0) stores the count of owned tokens
        owned_tokens: Mapping<(AccountId, CanvasId, u64), TokenId>,
        /// Mapping from token to the index of the owner tokens list
        owned_tokens_index: Mapping<TokenId, (CanvasId, u64)>,
        /// Mapping from token to approved account
        token_approvals: Mapping<TokenId, AccountId>,
        /// Mapping from owner to operator approvals
        operator_approvals: Mapping<(AccountId, AccountId), ()>,
        /// Mapping from owner to number of owned token
        balance: Mapping<AccountId, u64>,
    }

    /// Concats (canvas_id, cord_x, cord_y) and store it as TokenId (u128)
    #[inline]
    fn encode(canvas_id: CanvasId, cord_x: u8, cord_y: u8) -> TokenId {
        1_000_000 * TokenId::from(canvas_id) + 1000 * TokenId::from(cord_x) + TokenId::from(cord_y)
    }

    /// Breaks the token id into (CanvasId, cord_X, cord_Y)
    fn decode(id: &TokenId) -> (CanvasId, u8, u8) {
        let canvas_id: CanvasId = (id / 1_000_000).try_into().unwrap();
        let cord_x: u8 = ((id / 1000) % 1000).try_into().unwrap();
        let cord_y: u8 = (id % 1000).try_into().unwrap();
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
            if end_time <= self.env().block_timestamp() {
                return Err(Error::InvalidEndtime);
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
                base_price,
                premium,
                is_dynamic,
            };
            self.canvas_details.insert(&canvas_id, &canvas);
            self.canvas_nonce += 1;

            let fees = self.env().transferred_value();
            self.update_cash_flow(&caller, &None, &fees);

            self.env().emit_event(CanvasCreated {
                canvas_id,
                creator: caller,
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
            dimensions: Option<(u8, u8)>,
            new_start_time: Option<u64>,
            new_end_time: Option<u64>,
            base_price: Option<Balance>,
            premium: Option<u8>,
            is_dynamic: Option<bool>,
        ) -> Result<()> {
            let canvas = self.get_canvas_details(canvas_id)?;

            if self.env().block_timestamp() >= canvas.start_time {
                return Err(Error::EditPhaseOver);
            }

            let start_time = new_start_time.unwrap_or(canvas.start_time);
            let end_time = new_end_time.unwrap_or(canvas.end_time);
            if start_time >= end_time {
                return Err(Error::InvalidDuration);
            }
            if end_time <= self.env().block_timestamp() {
                return Err(Error::InvalidEndtime);
            }

            let ncanvas = Canvas {
                title: title.unwrap_or(canvas.title),
                desc: desc.unwrap_or(canvas.desc),
                dimensions: dimensions.unwrap_or(canvas.dimensions),
                base_price: base_price.unwrap_or(canvas.base_price),
                premium: premium.unwrap_or(canvas.premium),
                is_dynamic: is_dynamic.unwrap_or(canvas.is_dynamic),
                start_time,
                end_time,
                ..canvas
            };

            self.canvas_details.insert(&canvas_id, &ncanvas);

            self.env().emit_event(CanvasEdited { canvas_id });
            Ok(())
        }

        #[ink(message, payable)]
        pub fn capture_cell(&mut self, token_id: TokenId, color: Option<Colors>) -> Result<()> {
            let caller = self.env().caller();
            let cell = match self.get_cell_details(token_id) {
                Ok(cell) => cell,
                Err(_) => return self.mint(&token_id, &caller, &color),
            };

            if caller == cell.owner {
                return Err(Error::CannotCaptureOwnToken);
            }

            let (canvas_id, _, _) = decode(&token_id);
            let canvas = self.get_canvas_details(canvas_id)?;

            if self.env().block_timestamp() > canvas.end_time {
                return Err(Error::NotAuctionPhase);
            }

            let price = cell.value * (100 + canvas.premium as u128) / 100;
            let bid = self.env().transferred_value();

            if bid < price {
                return Err(Error::InsufficientFunds);
            }

            self.env()
                .transfer(cell.owner, bid)
                .expect("transfer failed"); // Is Re-entrancy possible?

            self.remove_token_from(&token_id, &cell.owner);
            self.add_token_to(&token_id, &caller);

            let ncell = Cell {
                owner: caller,
                value: bid,
                color: color.map_or(cell.color, |c| Colors::color_code(&c)),
            };
            self.grids.insert(&token_id, &ncell);

            self.update_cash_flow(&caller, &Some(cell.owner), &bid);
            self.update_canvas_analytics(&canvas_id, &caller);

            self.env().emit_event(TokenCaptured {
                token_id,
                from: cell.owner,
                by: caller,
                color,
            });
            self.env().emit_event(Transfer {
                from: Some(cell.owner),
                to: Some(caller),
                id: token_id,
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
            self.change_color(&canvas_id, &cord_x, &cord_y, &new_color);
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
                self.change_color(&canvas_id, cord_x, cord_y, new_color);
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
                    let token_id = encode(canvas_id, x, y);
                    let cell = self.get_cell_details(token_id).unwrap_or_default();
                    row.push(cell);
                }
                grid.push(row);
            }

            Ok(grid)
        }

        #[ink(message)]
        pub fn get_colored_grid(&self, canvas_id: CanvasId) -> Result<Vec<Vec<u32>>> {
            let canvas = self.get_canvas_details(canvas_id)?;

            let mut grid: Vec<Vec<u32>> = Vec::new();
            grid.reserve_exact(canvas.dimensions.0.into());

            for x in 0..canvas.dimensions.0 {
                let mut row: Vec<u32> = Vec::new();
                row.reserve_exact(canvas.dimensions.1.into());
                for y in 0..canvas.dimensions.1 {
                    let token_id = encode(canvas_id, x, y);
                    let color = match self.get_cell_details(token_id) {
                        Ok(cell) => cell.color,
                        Err(_) => Colors::color_code(&Colors::White),
                    };
                    row.push(color);
                }
                grid.push(row);
            }
            Ok(grid)
        }

        #[ink(message)]
        pub fn get_cell_details(&self, token_id: TokenId) -> Result<Cell> {
            self.grids
                .get(&token_id)
                .ok_or_else(|| match self.is_valid_token_id(&token_id) {
                    true => Error::CellNotMinted,
                    false => Error::TokenNotFound,
                })
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
        pub fn get_user_nfts(&self, acc: AccountId, canvas_id: CanvasId) -> Vec<TokenId> {
            let count = self
                .owned_tokens
                .get(&(acc, canvas_id, 0))
                .unwrap_or_default();

            (1..=count)
                .into_iter()
                .map(|x| (self.owned_tokens.get(&(acc, canvas_id, x)).unwrap()))
                .collect()
        }

        #[ink(message)]
        pub fn get_user_nft_count(&self, acc: AccountId, canvas_id: CanvasId) -> u64 {
            self.owned_tokens.get(&(acc, canvas_id, 0)).unwrap_or(0)
        }

        fn only_owner(&self) -> Result<()> {
            if self.env().caller() != self.owner {
                return Err(Error::Unauthorised);
            }
            Ok(())
        }

        fn change_color(
            &mut self,
            canvas_id: &CanvasId,
            cord_x: &u8,
            cord_y: &u8,
            new_color: &Colors,
        ) {
            let token_id = encode(*canvas_id, *cord_x, *cord_y);
            let mut cell = self.get_cell_details(token_id).expect("cell not found");
            assert!(self.env().caller() == cell.owner, "Not Authorised");

            cell.color = Colors::color_code(new_color);
            self.grids.insert(&token_id, &cell);

            self.env().emit_event(TokenColor {
                token_id,
                color: *new_color,
            });
        }

        fn mint(
            &mut self,
            token_id: &TokenId,
            owner: &AccountId,
            color: &Option<Colors>,
        ) -> Result<()> {
            let (canvas_id, cord_x, cord_y) = decode(&token_id);
            let canvas = self.get_canvas_details(canvas_id)?;

            let time = self.env().block_timestamp();
            if time < canvas.start_time || time > canvas.end_time {
                return Err(Error::NotAuctionPhase);
            }
            if cord_x >= canvas.dimensions.0 || cord_y >= canvas.dimensions.1 {
                return Err(Error::TokenNotFound);
            }

            let bid = self.env().transferred_value();
            if bid < canvas.base_price {
                return Err(Error::InsufficientFunds);
            }

            self.env()
                .transfer(canvas.creator, bid)
                .expect("transfer failed");

            let cell = Cell {
                owner: *owner,
                value: bid,
                color: color.unwrap_or(Colors::White).color_code(),
            };
            self.grids.insert(&token_id, &cell);

            self.add_token_to(&token_id, &owner);
            self.update_cash_flow(&owner, &Some(canvas.creator), &bid);
            self.update_canvas_analytics(&canvas_id, &owner);

            self.env().emit_event(Transfer {
                from: None,
                to: Some(*owner),
                id: *token_id,
            });
            Ok(())
        }

        fn update_cash_flow(&mut self, from: &AccountId, to: &Option<AccountId>, val: &Balance) {
            let (mut spent, receive) = self.cash_flow.get(&from).unwrap_or_default();
            spent += val;
            self.cash_flow.insert(&from, &(spent, receive));

            if let Some(to) = to {
                let (spent, mut receive) = self.cash_flow.get(&to).unwrap_or_default();
                receive += val;
                self.cash_flow.insert(&to, &(spent, receive));
            }
        }

        fn update_canvas_analytics(&mut self, canvas_id: &CanvasId, user: &AccountId) {
            let mut stats = self.canvas_analytics.get(canvas_id).unwrap_or_default();
            stats.total_bids += 1;
            stats.total_participants +=
                match self.participants.insert_return_size((canvas_id, user), &()) {
                    Some(_) => 0,
                    None => 1,
                };
            self.canvas_analytics.insert(&canvas_id, &stats);
        }

        fn is_valid_token_id(&self, token_id: &TokenId) -> bool {
            let (canvas_id, cord_x, cord_y) = decode(token_id);
            if let Ok(canvas) = self.get_canvas_details(canvas_id) {
                cord_x < canvas.dimensions.0 && cord_y < canvas.dimensions.1
            } else {
                false
            }
        }
    }

    /// ERC721 standard implemented here
    impl CreativeNft {
        #[ink(message)]
        pub fn balance_of(&self, owner: AccountId) -> u64 {
            self.balance.get(&owner).unwrap_or(0)
        }

        #[ink(message)]
        pub fn owner_of(&self, id: TokenId) -> Option<AccountId> {
            match self.get_cell_details(id) {
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

            self.approved_or_owner(&caller, &id)?;

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

            self.approved_or_owner(&caller, &id)?;
            self.token_approvals.remove(&id);

            self.remove_token_from(&id, &from);
            self.add_token_to(&id, &to);

            let mut cell = self.get_cell_details(id).unwrap();
            cell.owner = to;
            self.grids.insert(&id, &cell);

            self.env().emit_event(Transfer {
                from: Some(from),
                to: Some(to),
                id,
            });
            Ok(())
        }

        fn remove_token_from(&mut self, token_id: &TokenId, from: &AccountId) {
            let (canvas_id, idx) = self.owned_tokens_index.get(&token_id).unwrap();
            let count = self.owned_tokens.get((from, canvas_id, 0)).unwrap();

            if idx != count {
                let last_token_id = self.owned_tokens.get((from, canvas_id, count)).unwrap();
                self.owned_tokens_index
                    .insert(&last_token_id, &(canvas_id, idx));
                self.owned_tokens
                    .insert((from, canvas_id, idx), &last_token_id);
            }
            self.owned_tokens.remove((from, canvas_id, count));
            self.owned_tokens.insert((from, canvas_id, 0), &(count - 1));
            self.update_balance(from, &1, &true);
        }

        fn add_token_to(&mut self, token_id: &TokenId, to: &AccountId) {
            let (canvas_id, _, _) = decode(token_id);
            let pos = self
                .owned_tokens
                .get((to, canvas_id, 0))
                .unwrap_or_default()
                + 1;
            self.owned_tokens_index.insert(&token_id, &(canvas_id, pos));
            self.owned_tokens.insert((to, canvas_id, pos), token_id);
            self.owned_tokens.insert((to, canvas_id, 0), &pos);
            self.update_balance(&to, &1, &false); // See if it should be included or kept outside
        }

        fn approved_or_owner(&self, caller: &AccountId, id: &TokenId) -> Result<()> {
            let owner = match self.owner_of(*id) {
                Some(a) => Ok(a),
                None => Err(Error::TokenNotFound),
            }?;

            if caller == &AccountId::from([0x0; 32]) {
                return Err(Error::NotAllowed);
            }

            let (canvas_id, _, _) = decode(id);
            let canvas = self.get_canvas_details(canvas_id)?;

            if self.env().block_timestamp() <= canvas.end_time {
                return Err(Error::TokenLocked);
            }

            match *caller == owner
                || self.token_approvals.get(id) == Some(*caller)
                || self.is_approved_for_all(owner, *caller)
            {
                true => Ok(()),
                false => Err(Error::Unauthorised),
            }
        }

        fn update_balance(&mut self, acc: &AccountId, amt: &u64, negative: &bool) {
            let mut balance = self.balance.get(acc).unwrap_or(0);
            if *negative {
                assert!(*amt <= balance, "underflow");
                balance -= amt;
            } else {
                balance += amt;
            }
            self.balance.insert(&acc, &balance);
        }
    }
}
