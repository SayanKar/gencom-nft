export const metadata = {
  "source": {
    "hash": "0x34f103701480578b84df2b42b949c1e22876bf9f74660f3b7b777961a385dd55",
    "language": "ink! 3.4.0",
    "compiler": "rustc 1.65.0-nightly"
  },
  "contract": {
    "name": "creative_nft",
    "version": "3.4.0",
    "authors": [
      "Nimish Agrawal realnimish@gmail.com"
    ]
  },
  "V3": {
    "spec": {
      "constructors": [
        {
          "args": [
            {
              "label": "creation_fees",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            },
            {
              "label": "commission_percent",
              "type": {
                "displayName": [
                  "u8"
                ],
                "type": 3
              }
            }
          ],
          "docs": [
            "Creates a new auction place with the minimum canvas creation fees as @fees"
          ],
          "label": "new",
          "payable": false,
          "selector": "0x9bae9d5e"
        }
      ],
      "docs": [],
      "events": [
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "from",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 55
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "to",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 55
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Event emitted when a token transfer occurs."
          ],
          "label": "Transfer"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "approved",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Event emitted when a token approve occurs."
          ],
          "label": "Approval"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "operator",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "approved",
              "type": {
                "displayName": [
                  "bool"
                ],
                "type": 13
              }
            }
          ],
          "docs": [
            " Event emitted when an operator is enabled or disabled for an owner.",
            " The operator can manage all NFTs of the owner."
          ],
          "label": "ApprovalForAll"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "creator",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Event emitted when a new canvas is created"
          ],
          "label": "CanvasCreated"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            }
          ],
          "docs": [],
          "label": "CanvasEdited"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "token_id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "color",
              "type": {
                "displayName": [
                  "Colors"
                ],
                "type": 40
              }
            }
          ],
          "docs": [
            " Event emitted when the color of token_id is updated"
          ],
          "label": "TokenColor"
        },
        {
          "args": [
            {
              "docs": [],
              "indexed": true,
              "label": "token_id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": true,
              "label": "by",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "docs": [],
              "indexed": false,
              "label": "color",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 39
              }
            }
          ],
          "docs": [
            " Event emitted when a user outbids earlier owner and becomes the new owner"
          ],
          "label": "TokenCaptured"
        }
      ],
      "messages": [
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Returns true if the account has sudo privileges"
          ],
          "label": "has_sudo_powers",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 13
          },
          "selector": "0x207cc023"
        },
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " (PRIVILEGED) Give the account sudo privileges"
          ],
          "label": "add_sudo",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0xe69daaea"
        },
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " (PRIVILEGED) Take away the sudo privilege from the given account"
          ],
          "label": "remove_sudo",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0xb409c321"
        },
        {
          "args": [
            {
              "label": "new_fees",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            }
          ],
          "docs": [
            " PRIVILEGED Call. Owner can change the min. fees for future canvases"
          ],
          "label": "update_creation_fees",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x8fccae97"
        },
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "val",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            }
          ],
          "docs": [
            " PRIVILEGED Call. Owner can claim some portion of fees collected so far"
          ],
          "label": "collect_fees",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x940af456"
        },
        {
          "args": [
            {
              "label": "title",
              "type": {
                "displayName": [
                  "String"
                ],
                "type": 10
              }
            },
            {
              "label": "desc",
              "type": {
                "displayName": [
                  "String"
                ],
                "type": 10
              }
            },
            {
              "label": "dimensions",
              "type": {
                "displayName": [],
                "type": 11
              }
            },
            {
              "label": "start_time",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 12
              }
            },
            {
              "label": "end_time",
              "type": {
                "displayName": [
                  "u64"
                ],
                "type": 12
              }
            },
            {
              "label": "base_price",
              "type": {
                "displayName": [
                  "Balance"
                ],
                "type": 6
              }
            },
            {
              "label": "premium",
              "type": {
                "displayName": [
                  "u8"
                ],
                "type": 3
              }
            },
            {
              "label": "is_dynamic",
              "type": {
                "displayName": [
                  "bool"
                ],
                "type": 13
              }
            }
          ],
          "docs": [
            " (PAYABLE) Creates a new canvas room.",
            "",
            " `premium` denotes the min % of additional value in addition to the last_price",
            " a buyer needs to pay to gain ownership of a token during auction.",
            " Its value can be from 0% - 255% (scale = 1)",
            "",
            " If `is_dynamic` is set to `true` then owners can change the color of their",
            " token(cell) even after the auction period is over!"
          ],
          "label": "create_canvas",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 32
          },
          "selector": "0xd57688e4"
        },
        {
          "args": [
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            },
            {
              "label": "title",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 33
              }
            },
            {
              "label": "desc",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 33
              }
            },
            {
              "label": "dimensions",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 34
              }
            },
            {
              "label": "new_start_time",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 35
              }
            },
            {
              "label": "new_end_time",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 35
              }
            },
            {
              "label": "base_price",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 36
              }
            },
            {
              "label": "premium",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 37
              }
            },
            {
              "label": "is_dynamic",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 38
              }
            }
          ],
          "docs": [
            " Creator can make changes in the canvas metadata BEFORE the start_time of an auction"
          ],
          "label": "edit_canvas",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x1c0753f8"
        },
        {
          "args": [
            {
              "label": "token_id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            },
            {
              "label": "color",
              "type": {
                "displayName": [
                  "Option"
                ],
                "type": 39
              }
            }
          ],
          "docs": [
            " (PAYABLE) Gain ownership of the given token_id by paying a premium over the",
            " last bid value. Caller can optionally update the cell color to a different color."
          ],
          "label": "capture_cell",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0xe9e4767d"
        },
        {
          "args": [
            {
              "label": "token_ids",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 41
              }
            },
            {
              "label": "colors",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 42
              }
            },
            {
              "label": "bids",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 43
              }
            }
          ],
          "docs": [
            " (PRIVILEGED) Allows capturing multiple tokens in a batch. Right now only for development",
            " usage. It will be rolled out for all in the future after the gameplay considerations."
          ],
          "label": "capture_multiple_cells",
          "mutates": true,
          "payable": true,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x7295b0c3"
        },
        {
          "args": [
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            },
            {
              "label": "cord_x",
              "type": {
                "displayName": [
                  "u8"
                ],
                "type": 3
              }
            },
            {
              "label": "cord_y",
              "type": {
                "displayName": [
                  "u8"
                ],
                "type": 3
              }
            },
            {
              "label": "new_color",
              "type": {
                "displayName": [
                  "Colors"
                ],
                "type": 40
              }
            }
          ],
          "docs": [
            " User can change the color of the cell they own; given either",
            " the canvas is of dynamic type or the auction is still active."
          ],
          "label": "change_cell_color",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x7786ff36"
        },
        {
          "args": [
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            },
            {
              "label": "data",
              "type": {
                "displayName": [
                  "Vec"
                ],
                "type": 44
              }
            }
          ],
          "docs": [
            " Same as [change_cell_color] but can update multiple tokens (belonging to the same canvas) at once."
          ],
          "label": "change_multiple_cells_color",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x6f2c6883"
        },
        {
          "args": [],
          "docs": [
            " Returns (commissionPercent, canvasNonce, creationFees)"
          ],
          "label": "get_game_details",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [],
            "type": 46
          },
          "selector": "0x5f6f09fd"
        },
        {
          "args": [
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            }
          ],
          "docs": [
            " Get the metadata of the given canvas if it exists"
          ],
          "label": "get_canvas_details",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 47
          },
          "selector": "0x508a25eb"
        },
        {
          "args": [
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            }
          ],
          "docs": [
            " @returns the participation record (total_bids, total_participants) of the given canvas"
          ],
          "label": "get_canvas_stats",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "CanvasStats"
            ],
            "type": 15
          },
          "selector": "0x0b4cf126"
        },
        {
          "args": [
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            }
          ],
          "docs": [
            " Get cell details of all the cells (whether minted or not) part of the canvas.",
            "",
            " @NOTE call is likely to fail if the dimensions of the grid is not small!"
          ],
          "label": "get_grid_details",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 48
          },
          "selector": "0xe05d2a18"
        },
        {
          "args": [
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            }
          ],
          "docs": [
            " Get color of each cell in the given canvas. Cells not minted have color WHITE (0xf8f8f8) by default."
          ],
          "label": "get_colored_grid",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 51
          },
          "selector": "0xa7d8a4ce"
        },
        {
          "args": [
            {
              "label": "token_id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Returns the data (owner, color, value) of the cell if it exists.",
            " Returns `Error::CellNotMinted` in the case the token_id is part of an existing canvas.",
            " Otherwise returns `Error::TokenNotFound`"
          ],
          "label": "get_cell_details",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 54
          },
          "selector": "0xec956ac1"
        },
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Returns the list of CanvasIds which were the created by the given user account."
          ],
          "label": "get_user_created_canvas_ids",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 53
          },
          "selector": "0x0eb06662"
        },
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Returns the list of CanvasIds in which user placed atleast one successful bid."
          ],
          "label": "get_user_participated_canvas_ids",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 53
          },
          "selector": "0x50e01608"
        },
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " @returns (spent, received) of the given user. It is the cumulative value of",
            " monetary interactions done by a given user on the platform"
          ],
          "label": "get_user_cash_flow",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [],
            "type": 21
          },
          "selector": "0xdeb211c4"
        },
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            }
          ],
          "docs": [
            " Returns the list of tokenIds the user owns in the given canvas"
          ],
          "label": "get_user_nfts",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 41
          },
          "selector": "0x75b82d34"
        },
        {
          "args": [
            {
              "label": "acc",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "canvas_id",
              "type": {
                "displayName": [
                  "CanvasId"
                ],
                "type": 7
              }
            }
          ],
          "docs": [
            " Returns the count of NFTs (cell) a given user own in a given canvas"
          ],
          "label": "get_user_nft_count",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u64"
            ],
            "type": 12
          },
          "selector": "0x595ffb34"
        },
        {
          "args": [],
          "docs": [
            " Returns sorted list of canvas ids based on a heuristic which identifies trending canvases"
          ],
          "label": "get_canvases_by_popularity",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Vec"
            ],
            "type": 53
          },
          "selector": "0xe56c1f2c"
        },
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Returns the count of all tokens owned by the `owner` across all the canvases.",
            " It also includes the tokens which are part of live auction rooms."
          ],
          "label": "balance_of",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "u64"
            ],
            "type": 12
          },
          "selector": "0x0f755a56"
        },
        {
          "args": [
            {
              "label": "id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Returns the owner of the token if the token exists"
          ],
          "label": "owner_of",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Option"
            ],
            "type": 55
          },
          "selector": "0x99720c1e"
        },
        {
          "args": [
            {
              "label": "id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Returns the Account approved to manage the token `id` if set"
          ],
          "label": "get_approved",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "Option"
            ],
            "type": 55
          },
          "selector": "0x27592dea"
        },
        {
          "args": [
            {
              "label": "owner",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "operator",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            }
          ],
          "docs": [
            " Returns `true` if the operator is approved by the owner"
          ],
          "label": "is_approved_for_all",
          "mutates": false,
          "payable": false,
          "returnType": {
            "displayName": [
              "bool"
            ],
            "type": 13
          },
          "selector": "0x0f5922e9"
        },
        {
          "args": [
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "approved",
              "type": {
                "displayName": [
                  "bool"
                ],
                "type": 13
              }
            }
          ],
          "docs": [
            " Approves or disapproves the operator for all tokens of the caller"
          ],
          "label": "set_approval_for_all",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0xcfd0c27b"
        },
        {
          "args": [
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Approves the account to transfer the given token on behalf of the caller"
          ],
          "label": "approve",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x681266a0"
        },
        {
          "args": [
            {
              "label": "destination",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Transfers the token from the caller to the given destination"
          ],
          "label": "transfer",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x84a15da1"
        },
        {
          "args": [
            {
              "label": "from",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "to",
              "type": {
                "displayName": [
                  "AccountId"
                ],
                "type": 1
              }
            },
            {
              "label": "id",
              "type": {
                "displayName": [
                  "TokenId"
                ],
                "type": 12
              }
            }
          ],
          "docs": [
            " Transfer approved or owned token"
          ],
          "label": "transfer_from",
          "mutates": true,
          "payable": false,
          "returnType": {
            "displayName": [
              "Result"
            ],
            "type": 30
          },
          "selector": "0x0b396f18"
        }
      ]
    },
    "storage": {
      "struct": {
        "fields": [
          {
            "layout": {
              "cell": {
                "key": "0x0000000000000000000000000000000000000000000000000000000000000000",
                "ty": 0
              }
            },
            "name": "sudo"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                "ty": 6
              }
            },
            "name": "creation_fees"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0200000000000000000000000000000000000000000000000000000000000000",
                "ty": 3
              }
            },
            "name": "commission_percent"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                "ty": 7
              }
            },
            "name": "canvas_nonce"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                "ty": 8
              }
            },
            "name": "canvas_details"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                "ty": 14
              }
            },
            "name": "canvas_analytics"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                "ty": 16
              }
            },
            "name": "grids"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0700000000000000000000000000000000000000000000000000000000000000",
                "ty": 18
              }
            },
            "name": "participants"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0800000000000000000000000000000000000000000000000000000000000000",
                "ty": 20
              }
            },
            "name": "cash_flow"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0900000000000000000000000000000000000000000000000000000000000000",
                "ty": 22
              }
            },
            "name": "owned_tokens"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0a00000000000000000000000000000000000000000000000000000000000000",
                "ty": 24
              }
            },
            "name": "owned_tokens_index"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0b00000000000000000000000000000000000000000000000000000000000000",
                "ty": 26
              }
            },
            "name": "token_approvals"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0c00000000000000000000000000000000000000000000000000000000000000",
                "ty": 27
              }
            },
            "name": "operator_approvals"
          },
          {
            "layout": {
              "cell": {
                "key": "0x0d00000000000000000000000000000000000000000000000000000000000000",
                "ty": 29
              }
            },
            "name": "balance"
          }
        ]
      }
    },
    "types": [
      {
        "id": 0,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 4
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 1,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 2,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_env",
            "types",
            "AccountId"
          ]
        }
      },
      {
        "id": 2,
        "type": {
          "def": {
            "array": {
              "len": 32,
              "type": 3
            }
          }
        }
      },
      {
        "id": 3,
        "type": {
          "def": {
            "primitive": "u8"
          }
        }
      },
      {
        "id": 4,
        "type": {
          "def": {
            "tuple": []
          }
        }
      },
      {
        "id": 5,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "type": 2,
                  "typeName": "[u8; 32]"
                }
              ]
            }
          },
          "path": [
            "ink_primitives",
            "Key"
          ]
        }
      },
      {
        "id": 6,
        "type": {
          "def": {
            "primitive": "u128"
          }
        }
      },
      {
        "id": 7,
        "type": {
          "def": {
            "primitive": "u32"
          }
        }
      },
      {
        "id": 8,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 7
            },
            {
              "name": "V",
              "type": 9
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 9,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "creator",
                  "type": 1,
                  "typeName": "AccountId"
                },
                {
                  "name": "title",
                  "type": 10,
                  "typeName": "String"
                },
                {
                  "name": "desc",
                  "type": 10,
                  "typeName": "String"
                },
                {
                  "name": "dimensions",
                  "type": 11,
                  "typeName": "(u8, u8)"
                },
                {
                  "name": "start_time",
                  "type": 12,
                  "typeName": "u64"
                },
                {
                  "name": "end_time",
                  "type": 12,
                  "typeName": "u64"
                },
                {
                  "name": "base_price",
                  "type": 6,
                  "typeName": "Balance"
                },
                {
                  "name": "premium",
                  "type": 3,
                  "typeName": "u8"
                },
                {
                  "name": "is_dynamic",
                  "type": 13,
                  "typeName": "bool"
                }
              ]
            }
          },
          "path": [
            "creative_nft",
            "creative_nft",
            "Canvas"
          ]
        }
      },
      {
        "id": 10,
        "type": {
          "def": {
            "primitive": "str"
          }
        }
      },
      {
        "id": 11,
        "type": {
          "def": {
            "tuple": [
              3,
              3
            ]
          }
        }
      },
      {
        "id": 12,
        "type": {
          "def": {
            "primitive": "u64"
          }
        }
      },
      {
        "id": 13,
        "type": {
          "def": {
            "primitive": "bool"
          }
        }
      },
      {
        "id": 14,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 7
            },
            {
              "name": "V",
              "type": 15
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 15,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "total_bids",
                  "type": 7,
                  "typeName": "u32"
                },
                {
                  "name": "total_participants",
                  "type": 7,
                  "typeName": "u32"
                }
              ]
            }
          },
          "path": [
            "creative_nft",
            "creative_nft",
            "CanvasStats"
          ]
        }
      },
      {
        "id": 16,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 12
            },
            {
              "name": "V",
              "type": 17
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 17,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "owner",
                  "type": 1,
                  "typeName": "AccountId"
                },
                {
                  "name": "color",
                  "type": 7,
                  "typeName": "u32"
                },
                {
                  "name": "value",
                  "type": 6,
                  "typeName": "Balance"
                }
              ]
            }
          },
          "path": [
            "creative_nft",
            "creative_nft",
            "Cell"
          ]
        }
      },
      {
        "id": 18,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 19
            },
            {
              "name": "V",
              "type": 4
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 19,
        "type": {
          "def": {
            "tuple": [
              7,
              1
            ]
          }
        }
      },
      {
        "id": 20,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 21
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 21,
        "type": {
          "def": {
            "tuple": [
              6,
              6
            ]
          }
        }
      },
      {
        "id": 22,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 23
            },
            {
              "name": "V",
              "type": 12
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 23,
        "type": {
          "def": {
            "tuple": [
              1,
              7,
              12
            ]
          }
        }
      },
      {
        "id": 24,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 12
            },
            {
              "name": "V",
              "type": 25
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 25,
        "type": {
          "def": {
            "tuple": [
              7,
              12
            ]
          }
        }
      },
      {
        "id": 26,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 12
            },
            {
              "name": "V",
              "type": 1
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 27,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 28
            },
            {
              "name": "V",
              "type": 4
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 28,
        "type": {
          "def": {
            "tuple": [
              1,
              1
            ]
          }
        }
      },
      {
        "id": 29,
        "type": {
          "def": {
            "composite": {
              "fields": [
                {
                  "name": "offset_key",
                  "type": 5,
                  "typeName": "Key"
                }
              ]
            }
          },
          "params": [
            {
              "name": "K",
              "type": 1
            },
            {
              "name": "V",
              "type": 12
            }
          ],
          "path": [
            "ink_storage",
            "lazy",
            "mapping",
            "Mapping"
          ]
        }
      },
      {
        "id": 30,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 4
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 4
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 31,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "Unauthorised"
                },
                {
                  "index": 1,
                  "name": "NotAllowed"
                },
                {
                  "index": 2,
                  "name": "InsufficientFunds"
                },
                {
                  "index": 3,
                  "name": "InvalidDuration"
                },
                {
                  "index": 4,
                  "name": "InvalidEndtime"
                },
                {
                  "index": 5,
                  "name": "CanvasNotFound"
                },
                {
                  "index": 6,
                  "name": "TokenNotFound"
                },
                {
                  "index": 7,
                  "name": "CellNotMinted"
                },
                {
                  "index": 8,
                  "name": "ZeroDimensions"
                },
                {
                  "index": 9,
                  "name": "TokenLocked"
                },
                {
                  "index": 10,
                  "name": "EditPhaseOver"
                },
                {
                  "index": 11,
                  "name": "NotAuctionPhase"
                },
                {
                  "index": 12,
                  "name": "CannotCaptureOwnToken"
                }
              ]
            }
          },
          "path": [
            "creative_nft",
            "creative_nft",
            "Error"
          ]
        }
      },
      {
        "id": 32,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 7
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 7
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 33,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 10
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 10
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 34,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 11
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 11
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 35,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 12
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 12
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 36,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 6
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 6
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 37,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 3
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 3
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 38,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 13
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 13
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 39,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 40
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 40
            }
          ],
          "path": [
            "Option"
          ]
        }
      },
      {
        "id": 40,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "White"
                },
                {
                  "index": 1,
                  "name": "Platinum"
                },
                {
                  "index": 2,
                  "name": "Gray"
                },
                {
                  "index": 3,
                  "name": "Black"
                },
                {
                  "index": 4,
                  "name": "Pink"
                },
                {
                  "index": 5,
                  "name": "Red"
                },
                {
                  "index": 6,
                  "name": "Orange"
                },
                {
                  "index": 7,
                  "name": "Brown"
                },
                {
                  "index": 8,
                  "name": "Yellow"
                },
                {
                  "index": 9,
                  "name": "LightGreen"
                },
                {
                  "index": 10,
                  "name": "Green"
                },
                {
                  "index": 11,
                  "name": "Cyan"
                },
                {
                  "index": 12,
                  "name": "LightBlue"
                },
                {
                  "index": 13,
                  "name": "Blue"
                },
                {
                  "index": 14,
                  "name": "Lavender"
                },
                {
                  "index": 15,
                  "name": "Purple"
                }
              ]
            }
          },
          "path": [
            "creative_nft",
            "Colors"
          ]
        }
      },
      {
        "id": 41,
        "type": {
          "def": {
            "sequence": {
              "type": 12
            }
          }
        }
      },
      {
        "id": 42,
        "type": {
          "def": {
            "sequence": {
              "type": 39
            }
          }
        }
      },
      {
        "id": 43,
        "type": {
          "def": {
            "sequence": {
              "type": 6
            }
          }
        }
      },
      {
        "id": 44,
        "type": {
          "def": {
            "sequence": {
              "type": 45
            }
          }
        }
      },
      {
        "id": 45,
        "type": {
          "def": {
            "tuple": [
              3,
              3,
              40
            ]
          }
        }
      },
      {
        "id": 46,
        "type": {
          "def": {
            "tuple": [
              3,
              7,
              6
            ]
          }
        }
      },
      {
        "id": 47,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 9
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 9
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 48,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 49
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 49
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 49,
        "type": {
          "def": {
            "sequence": {
              "type": 50
            }
          }
        }
      },
      {
        "id": 50,
        "type": {
          "def": {
            "sequence": {
              "type": 17
            }
          }
        }
      },
      {
        "id": 51,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 52
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 52
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 52,
        "type": {
          "def": {
            "sequence": {
              "type": 53
            }
          }
        }
      },
      {
        "id": 53,
        "type": {
          "def": {
            "sequence": {
              "type": 7
            }
          }
        }
      },
      {
        "id": 54,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "fields": [
                    {
                      "type": 17
                    }
                  ],
                  "index": 0,
                  "name": "Ok"
                },
                {
                  "fields": [
                    {
                      "type": 31
                    }
                  ],
                  "index": 1,
                  "name": "Err"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 17
            },
            {
              "name": "E",
              "type": 31
            }
          ],
          "path": [
            "Result"
          ]
        }
      },
      {
        "id": 55,
        "type": {
          "def": {
            "variant": {
              "variants": [
                {
                  "index": 0,
                  "name": "None"
                },
                {
                  "fields": [
                    {
                      "type": 1
                    }
                  ],
                  "index": 1,
                  "name": "Some"
                }
              ]
            }
          },
          "params": [
            {
              "name": "T",
              "type": 1
            }
          ],
          "path": [
            "Option"
          ]
        }
      }
    ]
  }
}