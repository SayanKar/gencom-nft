export const metadata = {
  source: {
    hash: "0x8928e731c8cbdf9934c373b2169c58299c3b7897a70ee3b80692d676264dfec5",
    language: "ink! 4.2.1",
    compiler: "rustc 1.69.0-nightly",
    build_info: {
      build_mode: "Release",
      cargo_contract_version: "3.0.1",
      rust_toolchain: "nightly-aarch64-apple-darwin",
      wasm_opt_settings: {
        keep_debug_symbols: false,
        optimization_passes: "Z",
      },
    },
  },
  contract: {
    name: "creative_nft",
    version: "4.2.0",
    authors: ["Nimish Agrawal realnimish@gmail.com"],
  },
  spec: {
    constructors: [
      {
        args: [
          {
            label: "creation_fees",
            type: {
              displayName: ["Balance"],
              type: 1,
            },
          },
          {
            label: "commission_percent",
            type: {
              displayName: ["u8"],
              type: 2,
            },
          },
        ],
        default: false,
        docs: [
          "Creates a new auction place with the minimum canvas creation fees as @fees",
        ],
        label: "new",
        payable: false,
        returnType: {
          displayName: ["ink_primitives", "ConstructorResult"],
          type: 9,
        },
        selector: "0x9bae9d5e",
      },
    ],
    docs: [],
    environment: {
      accountId: {
        displayName: ["AccountId"],
        type: 4,
      },
      balance: {
        displayName: ["Balance"],
        type: 1,
      },
      blockNumber: {
        displayName: ["BlockNumber"],
        type: 3,
      },
      chainExtension: {
        displayName: ["ChainExtension"],
        type: 57,
      },
      hash: {
        displayName: ["Hash"],
        type: 56,
      },
      maxEventTopics: 4,
      timestamp: {
        displayName: ["Timestamp"],
        type: 7,
      },
    },
    events: [
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: "from",
            type: {
              displayName: ["Option"],
              type: 55,
            },
          },
          {
            docs: [],
            indexed: true,
            label: "to",
            type: {
              displayName: ["Option"],
              type: 55,
            },
          },
          {
            docs: [],
            indexed: true,
            label: "id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
        ],
        docs: ["Event emitted when a token transfer occurs."],
        label: "Transfer",
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: "owner",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            docs: [],
            indexed: true,
            label: "approved",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            docs: [],
            indexed: true,
            label: "id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
        ],
        docs: ["Event emitted when a token approve occurs."],
        label: "Approval",
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: "owner",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            docs: [],
            indexed: true,
            label: "operator",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            docs: [],
            indexed: false,
            label: "approved",
            type: {
              displayName: ["bool"],
              type: 8,
            },
          },
        ],
        docs: [
          "Event emitted when an operator is enabled or disabled for an owner.",
          "The operator can manage all NFTs of the owner.",
        ],
        label: "ApprovalForAll",
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
          {
            docs: [],
            indexed: true,
            label: "creator",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        docs: ["Event emitted when a new canvas is created"],
        label: "CanvasCreated",
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
        ],
        docs: [],
        label: "CanvasEdited",
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: "token_id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
          {
            docs: [],
            indexed: false,
            label: "color",
            type: {
              displayName: ["Colors"],
              type: 25,
            },
          },
        ],
        docs: ["Event emitted when the color of token_id is updated"],
        label: "TokenColor",
      },
      {
        args: [
          {
            docs: [],
            indexed: true,
            label: "token_id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
          {
            docs: [],
            indexed: true,
            label: "from",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            docs: [],
            indexed: true,
            label: "by",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            docs: [],
            indexed: false,
            label: "color",
            type: {
              displayName: ["Option"],
              type: 24,
            },
          },
        ],
        docs: [
          "Event emitted when a user outbids earlier owner and becomes the new owner",
        ],
        label: "TokenCaptured",
      },
    ],
    lang_error: {
      displayName: ["ink", "LangError"],
      type: 10,
    },
    messages: [
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [" Returns true if the account has sudo privileges"],
        label: "has_sudo_powers",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 11,
        },
        selector: "0x207cc023",
      },
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [" (PRIVILEGED) Give the account sudo privileges"],
        label: "add_sudo",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0xe69daaea",
      },
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [
          " (PRIVILEGED) Take away the sudo privilege from the given account",
        ],
        label: "remove_sudo",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0xb409c321",
      },
      {
        args: [
          {
            label: "new_fees",
            type: {
              displayName: ["Balance"],
              type: 1,
            },
          },
        ],
        default: false,
        docs: [
          " PRIVILEGED Call. Owner can change the min. fees for future canvases",
        ],
        label: "update_creation_fees",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x8fccae97",
      },
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "val",
            type: {
              displayName: ["Balance"],
              type: 1,
            },
          },
        ],
        default: false,
        docs: [
          " PRIVILEGED Call. Owner can claim some portion of fees collected so far",
        ],
        label: "collect_fees",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x940af456",
      },
      {
        args: [
          {
            label: "title",
            type: {
              displayName: ["String"],
              type: 6,
            },
          },
          {
            label: "desc",
            type: {
              displayName: ["String"],
              type: 6,
            },
          },
          {
            label: "dimensions",
            type: {
              displayName: [],
              type: 15,
            },
          },
          {
            label: "start_time",
            type: {
              displayName: ["u64"],
              type: 7,
            },
          },
          {
            label: "end_time",
            type: {
              displayName: ["u64"],
              type: 7,
            },
          },
          {
            label: "base_price",
            type: {
              displayName: ["Balance"],
              type: 1,
            },
          },
          {
            label: "premium",
            type: {
              displayName: ["u8"],
              type: 2,
            },
          },
          {
            label: "is_dynamic",
            type: {
              displayName: ["bool"],
              type: 8,
            },
          },
        ],
        default: false,
        docs: [
          " (PAYABLE) Creates a new canvas room.",
          "",
          " `premium` denotes the min % of additional value in addition to the last_price",
          " a buyer needs to pay to gain ownership of a token during auction.",
          " Its value can be from 0% - 255% (scale = 1)",
          "",
          " If `is_dynamic` is set to `true` then owners can change the color of their",
          " token(cell) even after the auction period is over!",
        ],
        label: "create_canvas",
        mutates: true,
        payable: true,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 16,
        },
        selector: "0xd57688e4",
      },
      {
        args: [
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
          {
            label: "title",
            type: {
              displayName: ["Option"],
              type: 18,
            },
          },
          {
            label: "desc",
            type: {
              displayName: ["Option"],
              type: 18,
            },
          },
          {
            label: "dimensions",
            type: {
              displayName: ["Option"],
              type: 19,
            },
          },
          {
            label: "new_start_time",
            type: {
              displayName: ["Option"],
              type: 20,
            },
          },
          {
            label: "new_end_time",
            type: {
              displayName: ["Option"],
              type: 20,
            },
          },
          {
            label: "base_price",
            type: {
              displayName: ["Option"],
              type: 21,
            },
          },
          {
            label: "premium",
            type: {
              displayName: ["Option"],
              type: 22,
            },
          },
          {
            label: "is_dynamic",
            type: {
              displayName: ["Option"],
              type: 23,
            },
          },
        ],
        default: false,
        docs: [
          " Creator can make changes in the canvas metadata BEFORE the start_time of an auction",
        ],
        label: "edit_canvas",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x1c0753f8",
      },
      {
        args: [
          {
            label: "token_id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
          {
            label: "color",
            type: {
              displayName: ["Option"],
              type: 24,
            },
          },
        ],
        default: false,
        docs: [
          " (PAYABLE) Gain ownership of the given token_id by paying a premium over the",
          " last bid value. Caller can optionally update the cell color to a different color.",
        ],
        label: "capture_cell",
        mutates: true,
        payable: true,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0xe9e4767d",
      },
      {
        args: [
          {
            label: "token_ids",
            type: {
              displayName: ["Vec"],
              type: 26,
            },
          },
          {
            label: "colors",
            type: {
              displayName: ["Vec"],
              type: 27,
            },
          },
          {
            label: "bids",
            type: {
              displayName: ["Vec"],
              type: 28,
            },
          },
        ],
        default: false,
        docs: [
          " (PRIVILEGED) Allows capturing multiple tokens in a batch. Right now only for development",
          " usage. It will be rolled out for all in the future after the gameplay considerations.",
        ],
        label: "capture_multiple_cells",
        mutates: true,
        payable: true,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x7295b0c3",
      },
      {
        args: [
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
          {
            label: "cord_x",
            type: {
              displayName: ["u8"],
              type: 2,
            },
          },
          {
            label: "cord_y",
            type: {
              displayName: ["u8"],
              type: 2,
            },
          },
          {
            label: "new_color",
            type: {
              displayName: ["Colors"],
              type: 25,
            },
          },
        ],
        default: false,
        docs: [
          " User can change the color of the cell they own; given either",
          " the canvas is of dynamic type or the auction is still active.",
        ],
        label: "change_cell_color",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x7786ff36",
      },
      {
        args: [
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
          {
            label: "data",
            type: {
              displayName: ["Vec"],
              type: 29,
            },
          },
        ],
        default: false,
        docs: [
          " Same as [change_cell_color] but can update multiple tokens (belonging to the same canvas) at once.",
        ],
        label: "change_multiple_cells_color",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x6f2c6883",
      },
      {
        args: [],
        default: false,
        docs: [" Returns (commissionPercent, canvasNonce, creationFees)"],
        label: "get_game_details",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 31,
        },
        selector: "0x5f6f09fd",
      },
      {
        args: [
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [" Get the metadata of the given canvas if it exists"],
        label: "get_canvas_details",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 33,
        },
        selector: "0x508a25eb",
      },
      {
        args: [
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [
          " @returns the participation record (total_bids, total_participants) of the given canvas",
        ],
        label: "get_canvas_stats",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 36,
        },
        selector: "0x0b4cf126",
      },
      {
        args: [
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [
          " Get cell details of all the cells (whether minted or not) part of the canvas.",
          "",
          " @NOTE call is likely to fail if the dimensions of the grid is not small!",
        ],
        label: "get_grid_details",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 38,
        },
        selector: "0xe05d2a18",
      },
      {
        args: [
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [
          " Get color of each cell in the given canvas. Cells not minted have color WHITE (0xf8f8f8) by default.",
        ],
        label: "get_colored_grid",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 43,
        },
        selector: "0xa7d8a4ce",
      },
      {
        args: [
          {
            label: "token_id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [
          " Returns the data (owner, color, value) of the cell if it exists.",
          " Returns `Error::CellNotMinted` in the case the token_id is part of an existing canvas.",
          " Otherwise returns `Error::TokenNotFound`",
        ],
        label: "get_cell_details",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 47,
        },
        selector: "0xec956ac1",
      },
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [
          " Returns the list of CanvasIds which were the created by the given user account.",
        ],
        label: "get_user_created_canvas_ids",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 49,
        },
        selector: "0x0eb06662",
      },
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [
          " Returns the list of CanvasIds in which user placed atleast one successful bid.",
        ],
        label: "get_user_participated_canvas_ids",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 49,
        },
        selector: "0x50e01608",
      },
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [
          " @returns (spent, received) of the given user. It is the cumulative value of",
          " monetary interactions done by a given user on the platform",
        ],
        label: "get_user_cash_flow",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 50,
        },
        selector: "0xdeb211c4",
      },
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [
          " Returns the list of tokenIds the user owns in the given canvas",
        ],
        label: "get_user_nfts",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 52,
        },
        selector: "0x75b82d34",
      },
      {
        args: [
          {
            label: "acc",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "canvas_id",
            type: {
              displayName: ["CanvasId"],
              type: 3,
            },
          },
        ],
        default: false,
        docs: [
          " Returns the count of NFTs (cell) a given user own in a given canvas",
        ],
        label: "get_user_nft_count",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 53,
        },
        selector: "0x595ffb34",
      },
      {
        args: [],
        default: false,
        docs: [
          " Returns sorted list of canvas ids based on a heuristic which identifies trending canvases",
        ],
        label: "get_canvases_by_popularity",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 49,
        },
        selector: "0xe56c1f2c",
      },
      {
        args: [
          {
            label: "owner",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [
          " Returns the count of all tokens owned by the `owner` across all the canvases.",
          " It also includes the tokens which are part of live auction rooms.",
        ],
        label: "balance_of",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 53,
        },
        selector: "0x0f755a56",
      },
      {
        args: [
          {
            label: "id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [" Returns the owner of the token if the token exists"],
        label: "owner_of",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 54,
        },
        selector: "0x99720c1e",
      },
      {
        args: [
          {
            label: "id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [" Returns the Account approved to manage the token `id` if set"],
        label: "get_approved",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 54,
        },
        selector: "0x27592dea",
      },
      {
        args: [
          {
            label: "owner",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "operator",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
        ],
        default: false,
        docs: [" Returns `true` if the operator is approved by the owner"],
        label: "is_approved_for_all",
        mutates: false,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 11,
        },
        selector: "0x0f5922e9",
      },
      {
        args: [
          {
            label: "to",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "approved",
            type: {
              displayName: ["bool"],
              type: 8,
            },
          },
        ],
        default: false,
        docs: [
          " Approves or disapproves the operator for all tokens of the caller",
        ],
        label: "set_approval_for_all",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0xcfd0c27b",
      },
      {
        args: [
          {
            label: "to",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [
          " Approves the account to transfer the given token on behalf of the caller",
        ],
        label: "approve",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x681266a0",
      },
      {
        args: [
          {
            label: "destination",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [" Transfers the token from the caller to the given destination"],
        label: "transfer",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x84a15da1",
      },
      {
        args: [
          {
            label: "from",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "to",
            type: {
              displayName: ["AccountId"],
              type: 4,
            },
          },
          {
            label: "id",
            type: {
              displayName: ["TokenId"],
              type: 7,
            },
          },
        ],
        default: false,
        docs: [" Transfer approved or owned token"],
        label: "transfer_from",
        mutates: true,
        payable: false,
        returnType: {
          displayName: ["ink", "MessageResult"],
          type: 12,
        },
        selector: "0x0b396f18",
      },
    ],
  },
  storage: {
    root: {
      layout: {
        struct: {
          fields: [
            {
              layout: {
                root: {
                  layout: {
                    leaf: {
                      key: "0x233a49fd",
                      ty: 0,
                    },
                  },
                  root_key: "0x233a49fd",
                },
              },
              name: "sudo",
            },
            {
              layout: {
                leaf: {
                  key: "0x00000000",
                  ty: 1,
                },
              },
              name: "creation_fees",
            },
            {
              layout: {
                leaf: {
                  key: "0x00000000",
                  ty: 2,
                },
              },
              name: "commission_percent",
            },
            {
              layout: {
                leaf: {
                  key: "0x00000000",
                  ty: 3,
                },
              },
              name: "canvas_nonce",
            },
            {
              layout: {
                root: {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: "0x7aa1042b",
                              ty: 4,
                            },
                          },
                          name: "creator",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x7aa1042b",
                              ty: 6,
                            },
                          },
                          name: "title",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x7aa1042b",
                              ty: 6,
                            },
                          },
                          name: "desc",
                        },
                        {
                          layout: {
                            struct: {
                              fields: [
                                {
                                  layout: {
                                    leaf: {
                                      key: "0x7aa1042b",
                                      ty: 2,
                                    },
                                  },
                                  name: "0",
                                },
                                {
                                  layout: {
                                    leaf: {
                                      key: "0x7aa1042b",
                                      ty: 2,
                                    },
                                  },
                                  name: "1",
                                },
                              ],
                              name: "(A, B)",
                            },
                          },
                          name: "dimensions",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x7aa1042b",
                              ty: 7,
                            },
                          },
                          name: "start_time",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x7aa1042b",
                              ty: 7,
                            },
                          },
                          name: "end_time",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x7aa1042b",
                              ty: 1,
                            },
                          },
                          name: "base_price",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x7aa1042b",
                              ty: 2,
                            },
                          },
                          name: "premium",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x7aa1042b",
                              ty: 8,
                            },
                          },
                          name: "is_dynamic",
                        },
                      ],
                      name: "Canvas",
                    },
                  },
                  root_key: "0x7aa1042b",
                },
              },
              name: "canvas_details",
            },
            {
              layout: {
                root: {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: "0x37d796f9",
                              ty: 3,
                            },
                          },
                          name: "total_bids",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x37d796f9",
                              ty: 3,
                            },
                          },
                          name: "total_participants",
                        },
                      ],
                      name: "CanvasStats",
                    },
                  },
                  root_key: "0x37d796f9",
                },
              },
              name: "canvas_analytics",
            },
            {
              layout: {
                root: {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: "0x197bb1c5",
                              ty: 4,
                            },
                          },
                          name: "owner",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x197bb1c5",
                              ty: 3,
                            },
                          },
                          name: "color",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x197bb1c5",
                              ty: 1,
                            },
                          },
                          name: "value",
                        },
                      ],
                      name: "Cell",
                    },
                  },
                  root_key: "0x197bb1c5",
                },
              },
              name: "grids",
            },
            {
              layout: {
                root: {
                  layout: {
                    leaf: {
                      key: "0x5c4a71da",
                      ty: 0,
                    },
                  },
                  root_key: "0x5c4a71da",
                },
              },
              name: "participants",
            },
            {
              layout: {
                root: {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: "0x195852b1",
                              ty: 1,
                            },
                          },
                          name: "0",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x195852b1",
                              ty: 1,
                            },
                          },
                          name: "1",
                        },
                      ],
                      name: "(A, B)",
                    },
                  },
                  root_key: "0x195852b1",
                },
              },
              name: "cash_flow",
            },
            {
              layout: {
                root: {
                  layout: {
                    leaf: {
                      key: "0x8c01d6d1",
                      ty: 7,
                    },
                  },
                  root_key: "0x8c01d6d1",
                },
              },
              name: "owned_tokens",
            },
            {
              layout: {
                root: {
                  layout: {
                    struct: {
                      fields: [
                        {
                          layout: {
                            leaf: {
                              key: "0x94e9d920",
                              ty: 3,
                            },
                          },
                          name: "0",
                        },
                        {
                          layout: {
                            leaf: {
                              key: "0x94e9d920",
                              ty: 7,
                            },
                          },
                          name: "1",
                        },
                      ],
                      name: "(A, B)",
                    },
                  },
                  root_key: "0x94e9d920",
                },
              },
              name: "owned_tokens_index",
            },
            {
              layout: {
                root: {
                  layout: {
                    leaf: {
                      key: "0x5db32ad1",
                      ty: 4,
                    },
                  },
                  root_key: "0x5db32ad1",
                },
              },
              name: "token_approvals",
            },
            {
              layout: {
                root: {
                  layout: {
                    leaf: {
                      key: "0xb0bf768f",
                      ty: 0,
                    },
                  },
                  root_key: "0xb0bf768f",
                },
              },
              name: "operator_approvals",
            },
            {
              layout: {
                root: {
                  layout: {
                    leaf: {
                      key: "0xa9549b2a",
                      ty: 7,
                    },
                  },
                  root_key: "0xa9549b2a",
                },
              },
              name: "balance",
            },
          ],
          name: "CreativeNft",
        },
      },
      root_key: "0x00000000",
    },
  },
  types: [
    {
      id: 0,
      type: {
        def: {
          tuple: [],
        },
      },
    },
    {
      id: 1,
      type: {
        def: {
          primitive: "u128",
        },
      },
    },
    {
      id: 2,
      type: {
        def: {
          primitive: "u8",
        },
      },
    },
    {
      id: 3,
      type: {
        def: {
          primitive: "u32",
        },
      },
    },
    {
      id: 4,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 5,
                typeName: "[u8; 32]",
              },
            ],
          },
        },
        path: ["ink_primitives", "types", "AccountId"],
      },
    },
    {
      id: 5,
      type: {
        def: {
          array: {
            len: 32,
            type: 2,
          },
        },
      },
    },
    {
      id: 6,
      type: {
        def: {
          primitive: "str",
        },
      },
    },
    {
      id: 7,
      type: {
        def: {
          primitive: "u64",
        },
      },
    },
    {
      id: 8,
      type: {
        def: {
          primitive: "bool",
        },
      },
    },
    {
      id: 9,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 0,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 0,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 10,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 1,
                name: "CouldNotReadInput",
              },
            ],
          },
        },
        path: ["ink_primitives", "LangError"],
      },
    },
    {
      id: 11,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 8,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 8,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 12,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 13,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 13,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 13,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 0,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 14,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 0,
          },
          {
            name: "E",
            type: 14,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 14,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "Unauthorised",
              },
              {
                index: 1,
                name: "NotAllowed",
              },
              {
                index: 2,
                name: "InsufficientFunds",
              },
              {
                index: 3,
                name: "InvalidDuration",
              },
              {
                index: 4,
                name: "InvalidEndtime",
              },
              {
                index: 5,
                name: "CanvasNotFound",
              },
              {
                index: 6,
                name: "TokenNotFound",
              },
              {
                index: 7,
                name: "CellNotMinted",
              },
              {
                index: 8,
                name: "ZeroDimensions",
              },
              {
                index: 9,
                name: "TokenLocked",
              },
              {
                index: 10,
                name: "EditPhaseOver",
              },
              {
                index: 11,
                name: "NotAuctionPhase",
              },
              {
                index: 12,
                name: "CannotCaptureOwnToken",
              },
            ],
          },
        },
        path: ["creative_nft", "creative_nft", "Error"],
      },
    },
    {
      id: 15,
      type: {
        def: {
          tuple: [2, 2],
        },
      },
    },
    {
      id: 16,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 17,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 17,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 17,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 3,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 14,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 3,
          },
          {
            name: "E",
            type: 14,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 18,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "None",
              },
              {
                fields: [
                  {
                    type: 6,
                  },
                ],
                index: 1,
                name: "Some",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 6,
          },
        ],
        path: ["Option"],
      },
    },
    {
      id: 19,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "None",
              },
              {
                fields: [
                  {
                    type: 15,
                  },
                ],
                index: 1,
                name: "Some",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 15,
          },
        ],
        path: ["Option"],
      },
    },
    {
      id: 20,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "None",
              },
              {
                fields: [
                  {
                    type: 7,
                  },
                ],
                index: 1,
                name: "Some",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 7,
          },
        ],
        path: ["Option"],
      },
    },
    {
      id: 21,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "None",
              },
              {
                fields: [
                  {
                    type: 1,
                  },
                ],
                index: 1,
                name: "Some",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 1,
          },
        ],
        path: ["Option"],
      },
    },
    {
      id: 22,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "None",
              },
              {
                fields: [
                  {
                    type: 2,
                  },
                ],
                index: 1,
                name: "Some",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 2,
          },
        ],
        path: ["Option"],
      },
    },
    {
      id: 23,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "None",
              },
              {
                fields: [
                  {
                    type: 8,
                  },
                ],
                index: 1,
                name: "Some",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 8,
          },
        ],
        path: ["Option"],
      },
    },
    {
      id: 24,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "None",
              },
              {
                fields: [
                  {
                    type: 25,
                  },
                ],
                index: 1,
                name: "Some",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 25,
          },
        ],
        path: ["Option"],
      },
    },
    {
      id: 25,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "White",
              },
              {
                index: 1,
                name: "Platinum",
              },
              {
                index: 2,
                name: "Gray",
              },
              {
                index: 3,
                name: "Black",
              },
              {
                index: 4,
                name: "Pink",
              },
              {
                index: 5,
                name: "Red",
              },
              {
                index: 6,
                name: "Orange",
              },
              {
                index: 7,
                name: "Brown",
              },
              {
                index: 8,
                name: "Yellow",
              },
              {
                index: 9,
                name: "LightGreen",
              },
              {
                index: 10,
                name: "Green",
              },
              {
                index: 11,
                name: "Cyan",
              },
              {
                index: 12,
                name: "LightBlue",
              },
              {
                index: 13,
                name: "Blue",
              },
              {
                index: 14,
                name: "Lavender",
              },
              {
                index: 15,
                name: "Purple",
              },
            ],
          },
        },
        path: ["creative_nft", "Colors"],
      },
    },
    {
      id: 26,
      type: {
        def: {
          sequence: {
            type: 7,
          },
        },
      },
    },
    {
      id: 27,
      type: {
        def: {
          sequence: {
            type: 24,
          },
        },
      },
    },
    {
      id: 28,
      type: {
        def: {
          sequence: {
            type: 1,
          },
        },
      },
    },
    {
      id: 29,
      type: {
        def: {
          sequence: {
            type: 30,
          },
        },
      },
    },
    {
      id: 30,
      type: {
        def: {
          tuple: [2, 2, 25],
        },
      },
    },
    {
      id: 31,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 32,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 32,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 32,
      type: {
        def: {
          tuple: [2, 3, 1],
        },
      },
    },
    {
      id: 33,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 34,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 34,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 34,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 35,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 14,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 35,
          },
          {
            name: "E",
            type: 14,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 35,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: "creator",
                type: 4,
                typeName: "AccountId",
              },
              {
                name: "title",
                type: 6,
                typeName: "String",
              },
              {
                name: "desc",
                type: 6,
                typeName: "String",
              },
              {
                name: "dimensions",
                type: 15,
                typeName: "(u8, u8)",
              },
              {
                name: "start_time",
                type: 7,
                typeName: "u64",
              },
              {
                name: "end_time",
                type: 7,
                typeName: "u64",
              },
              {
                name: "base_price",
                type: 1,
                typeName: "Balance",
              },
              {
                name: "premium",
                type: 2,
                typeName: "u8",
              },
              {
                name: "is_dynamic",
                type: 8,
                typeName: "bool",
              },
            ],
          },
        },
        path: ["creative_nft", "creative_nft", "Canvas"],
      },
    },
    {
      id: 36,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 37,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 37,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 37,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: "total_bids",
                type: 3,
                typeName: "u32",
              },
              {
                name: "total_participants",
                type: 3,
                typeName: "u32",
              },
            ],
          },
        },
        path: ["creative_nft", "creative_nft", "CanvasStats"],
      },
    },
    {
      id: 38,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 39,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 39,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 39,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 40,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 14,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 40,
          },
          {
            name: "E",
            type: 14,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 40,
      type: {
        def: {
          sequence: {
            type: 41,
          },
        },
      },
    },
    {
      id: 41,
      type: {
        def: {
          sequence: {
            type: 42,
          },
        },
      },
    },
    {
      id: 42,
      type: {
        def: {
          composite: {
            fields: [
              {
                name: "owner",
                type: 4,
                typeName: "AccountId",
              },
              {
                name: "color",
                type: 3,
                typeName: "u32",
              },
              {
                name: "value",
                type: 1,
                typeName: "Balance",
              },
            ],
          },
        },
        path: ["creative_nft", "creative_nft", "Cell"],
      },
    },
    {
      id: 43,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 44,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 44,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 44,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 45,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 14,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 45,
          },
          {
            name: "E",
            type: 14,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 45,
      type: {
        def: {
          sequence: {
            type: 46,
          },
        },
      },
    },
    {
      id: 46,
      type: {
        def: {
          sequence: {
            type: 3,
          },
        },
      },
    },
    {
      id: 47,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 48,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 48,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 48,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 42,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 14,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 42,
          },
          {
            name: "E",
            type: 14,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 49,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 46,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 46,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 50,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 51,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 51,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 51,
      type: {
        def: {
          tuple: [1, 1],
        },
      },
    },
    {
      id: 52,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 26,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 26,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 53,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 7,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 7,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 54,
      type: {
        def: {
          variant: {
            variants: [
              {
                fields: [
                  {
                    type: 55,
                  },
                ],
                index: 0,
                name: "Ok",
              },
              {
                fields: [
                  {
                    type: 10,
                  },
                ],
                index: 1,
                name: "Err",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 55,
          },
          {
            name: "E",
            type: 10,
          },
        ],
        path: ["Result"],
      },
    },
    {
      id: 55,
      type: {
        def: {
          variant: {
            variants: [
              {
                index: 0,
                name: "None",
              },
              {
                fields: [
                  {
                    type: 4,
                  },
                ],
                index: 1,
                name: "Some",
              },
            ],
          },
        },
        params: [
          {
            name: "T",
            type: 4,
          },
        ],
        path: ["Option"],
      },
    },
    {
      id: 56,
      type: {
        def: {
          composite: {
            fields: [
              {
                type: 5,
                typeName: "[u8; 32]",
              },
            ],
          },
        },
        path: ["ink_primitives", "types", "Hash"],
      },
    },
    {
      id: 57,
      type: {
        def: {
          variant: {},
        },
        path: ["ink_env", "types", "NoChainExtension"],
      },
    },
  ],
  version: "4",
};
