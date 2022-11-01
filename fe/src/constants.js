export const colors = {
    "0": "#f8f8f8",
    "1": "#E4E4E4",
    "2": "#888888",
    "3": "#222222",
    "4": "#ffa7d1",
    "5": "#e50000",
    "6": "#e59500",
    "7": "#a06a42",
    "8": "#e5d900",
    "9": "#94e044",
    "10": "#02be01",
    "11": "#00d3dd",
    "12": "#0083c7",
    "13": "#0000ea",
    "14": "#cf6ee4",
    "15": "820080",
}
export const PRECISION = 1000_000_000_000n;
export const SYMBOL = 'SBY';
export const CONTRACT_ADDRESS = "atMUNA6heP5H2r2PzU9DujHF3BkSGkoHfaqSwqMinThdkHF";
export const metadata = {
    "source": {
      "hash": "0x596177dda9efb22da723ff64b63d5b6ecfe0a7b1e4235bffb5b6ad4967a4427d",
      "language": "ink! 3.4.0",
      "compiler": "rustc 1.65.0-nightly"
    },
    "contract": {
      "name": "creative_nft",
      "version": "3.4.0",
      "authors": [
        "[your_name] <[your_email]>"
      ]
    },
    "V3": {
      "spec": {
        "constructors": [
          {
            "args": [
              {
                "label": "fees",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 3
                }
              }
            ],
            "docs": [],
            "label": "new",
            "payable": false,
            "selector": "0x9bae9d5e"
          }
        ],
        "docs": [],
        "events": [],
        "messages": [
          {
            "args": [
              {
                "label": "new_fees",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 3
                }
              }
            ],
            "docs": [],
            "label": "update_creation_fees",
            "mutates": true,
            "payable": false,
            "returnType": null,
            "selector": "0x8fccae97"
          },
          {
            "args": [
              {
                "label": "title",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 6
                }
              },
              {
                "label": "desc",
                "type": {
                  "displayName": [
                    "String"
                  ],
                  "type": 6
                }
              },
              {
                "label": "dimensions",
                "type": {
                  "displayName": [],
                  "type": 7
                }
              },
              {
                "label": "start_time",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 8
                }
              },
              {
                "label": "end_time",
                "type": {
                  "displayName": [
                    "u64"
                  ],
                  "type": 8
                }
              },
              {
                "label": "base_price",
                "type": {
                  "displayName": [
                    "Balance"
                  ],
                  "type": 3
                }
              },
              {
                "label": "premium",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "is_dynamic",
                "type": {
                  "displayName": [
                    "bool"
                  ],
                  "type": 9
                }
              }
            ],
            "docs": [],
            "label": "create_canvas",
            "mutates": true,
            "payable": true,
            "returnType": {
              "displayName": [
                "CanvasId"
              ],
              "type": 3
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
                  "type": 3
                }
              },
              {
                "label": "title",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 20
                }
              },
              {
                "label": "desc",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 20
                }
              },
              {
                "label": "new_start_time",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 21
                }
              },
              {
                "label": "new_end_time",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 21
                }
              },
              {
                "label": "premium",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 22
                }
              },
              {
                "label": "is_dynamic",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 23
                }
              }
            ],
            "docs": [],
            "label": "edit_canvas",
            "mutates": true,
            "payable": false,
            "returnType": null,
            "selector": "0x1c0753f8"
          },
          {
            "args": [
              {
                "label": "canvas_id",
                "type": {
                  "displayName": [
                    "CanvasId"
                  ],
                  "type": 3
                }
              },
              {
                "label": "cord_x",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "cord_y",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "color",
                "type": {
                  "displayName": [
                    "Option"
                  ],
                  "type": 24
                }
              }
            ],
            "docs": [],
            "label": "capture_cell",
            "mutates": true,
            "payable": true,
            "returnType": null,
            "selector": "0xe9e4767d"
          },
          {
            "args": [
              {
                "label": "canvas_id",
                "type": {
                  "displayName": [
                    "CanvasId"
                  ],
                  "type": 3
                }
              },
              {
                "label": "cord_x",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "cord_y",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "new_color",
                "type": {
                  "displayName": [
                    "Colors"
                  ],
                  "type": 25
                }
              }
            ],
            "docs": [],
            "label": "change_cell_color",
            "mutates": true,
            "payable": false,
            "returnType": null,
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
                  "type": 3
                }
              },
              {
                "label": "data",
                "type": {
                  "displayName": [
                    "Vec"
                  ],
                  "type": 26
                }
              }
            ],
            "docs": [],
            "label": "change_multiple_cells_color",
            "mutates": true,
            "payable": false,
            "returnType": null,
            "selector": "0x6f2c6883"
          },
          {
            "args": [],
            "docs": [],
            "label": "get_game_details",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [],
              "type": 28
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
                  "type": 3
                }
              }
            ],
            "docs": [],
            "label": "get_canvas_details",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 29
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
                  "type": 3
                }
              }
            ],
            "docs": [],
            "label": "get_grid_details",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 30
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
                  "type": 3
                }
              },
              {
                "label": "cord_x",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              },
              {
                "label": "cord_y",
                "type": {
                  "displayName": [
                    "u8"
                  ],
                  "type": 2
                }
              }
            ],
            "docs": [],
            "label": "get_cell_details",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Option"
              ],
              "type": 33
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
                  "type": 0
                }
              }
            ],
            "docs": [],
            "label": "get_user_created_canvas_ids",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Vec"
              ],
              "type": 34
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
                  "type": 0
                }
              }
            ],
            "docs": [],
            "label": "get_user_participated_canvas_ids",
            "mutates": false,
            "payable": false,
            "returnType": {
              "displayName": [
                "Vec"
              ],
              "type": 34
            },
            "selector": "0x50e01608"
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
              "name": "owner"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0100000000000000000000000000000000000000000000000000000000000000",
                  "ty": 3
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
              "name": "canvas_nonce"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0300000000000000000000000000000000000000000000000000000000000000",
                  "ty": 4
                }
              },
              "name": "canvas_details"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0400000000000000000000000000000000000000000000000000000000000000",
                  "ty": 11
                }
              },
              "name": "grids"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0500000000000000000000000000000000000000000000000000000000000000",
                  "ty": 15
                }
              },
              "name": "participants"
            },
            {
              "layout": {
                "cell": {
                  "key": "0x0600000000000000000000000000000000000000000000000000000000000000",
                  "ty": 18
                }
              },
              "name": "canvas_analytics"
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
                    "type": 1,
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
          "id": 1,
          "type": {
            "def": {
              "array": {
                "len": 32,
                "type": 2
              }
            }
          }
        },
        {
          "id": 2,
          "type": {
            "def": {
              "primitive": "u8"
            }
          }
        },
        {
          "id": 3,
          "type": {
            "def": {
              "primitive": "u128"
            }
          }
        },
        {
          "id": 4,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 10,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 3
              },
              {
                "name": "V",
                "type": 5
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
          "id": 5,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "creator",
                    "type": 0,
                    "typeName": "AccountId"
                  },
                  {
                    "name": "title",
                    "type": 6,
                    "typeName": "String"
                  },
                  {
                    "name": "desc",
                    "type": 6,
                    "typeName": "String"
                  },
                  {
                    "name": "dimensions",
                    "type": 7,
                    "typeName": "(u8, u8)"
                  },
                  {
                    "name": "start_time",
                    "type": 8,
                    "typeName": "u64"
                  },
                  {
                    "name": "end_time",
                    "type": 8,
                    "typeName": "u64"
                  },
                  {
                    "name": "premium",
                    "type": 2,
                    "typeName": "u8"
                  },
                  {
                    "name": "is_dynamic",
                    "type": 9,
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
          "id": 6,
          "type": {
            "def": {
              "primitive": "str"
            }
          }
        },
        {
          "id": 7,
          "type": {
            "def": {
              "tuple": [
                2,
                2
              ]
            }
          }
        },
        {
          "id": 8,
          "type": {
            "def": {
              "primitive": "u64"
            }
          }
        },
        {
          "id": 9,
          "type": {
            "def": {
              "primitive": "bool"
            }
          }
        },
        {
          "id": 10,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "type": 1,
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
          "id": 11,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 10,
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
                "type": 13
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
          "id": 12,
          "type": {
            "def": {
              "tuple": [
                3,
                2,
                2
              ]
            }
          }
        },
        {
          "id": 13,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "owner",
                    "type": 0,
                    "typeName": "AccountId"
                  },
                  {
                    "name": "color",
                    "type": 14,
                    "typeName": "u32"
                  },
                  {
                    "name": "value",
                    "type": 3,
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
          "id": 14,
          "type": {
            "def": {
              "primitive": "u32"
            }
          }
        },
        {
          "id": 15,
          "type": {
            "def": {
              "composite": {
                "fields": [
                  {
                    "name": "offset_key",
                    "type": 10,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 16
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
          "id": 16,
          "type": {
            "def": {
              "tuple": [
                3,
                0
              ]
            }
          }
        },
        {
          "id": 17,
          "type": {
            "def": {
              "tuple": []
            }
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
                    "type": 10,
                    "typeName": "Key"
                  }
                ]
              }
            },
            "params": [
              {
                "name": "K",
                "type": 3
              },
              {
                "name": "V",
                "type": 19
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
                3,
                3
              ]
            }
          }
        },
        {
          "id": 20,
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
          "id": 21,
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
                        "type": 8
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
                "type": 8
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 22,
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
                        "type": 2
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
                "type": 2
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 23,
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
                        "type": 9
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
                "type": 9
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 24,
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
                        "type": 25
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
                "type": 25
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 25,
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
          "id": 26,
          "type": {
            "def": {
              "sequence": {
                "type": 27
              }
            }
          }
        },
        {
          "id": 27,
          "type": {
            "def": {
              "tuple": [
                2,
                2,
                25
              ]
            }
          }
        },
        {
          "id": 28,
          "type": {
            "def": {
              "tuple": [
                0,
                3,
                3
              ]
            }
          }
        },
        {
          "id": 29,
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
                        "type": 5
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
                "type": 5
              }
            ],
            "path": [
              "Option"
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
                    "index": 0,
                    "name": "None"
                  },
                  {
                    "fields": [
                      {
                        "type": 31
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
                "type": 31
              }
            ],
            "path": [
              "Option"
            ]
          }
        },
        {
          "id": 31,
          "type": {
            "def": {
              "sequence": {
                "type": 32
              }
            }
          }
        },
        {
          "id": 32,
          "type": {
            "def": {
              "sequence": {
                "type": 13
              }
            }
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
          "id": 34,
          "type": {
            "def": {
              "sequence": {
                "type": 3
              }
            }
          }
        }
      ]
    }
  }