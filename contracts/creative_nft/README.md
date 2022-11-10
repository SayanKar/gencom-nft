# Creative NFT

It is an ERC721 compliant NFT contract where users/community can come together to create
their own NFT Art in a collaborative fashion.

## Overview

Users can create collections (called Canvas) by paying a small creation fees
(which is controlled by the contract owner) and set its attributes.

A canvas is a 2D grid of the individual pixels (aka Token). Users can buy these
tokens during the bidding phase (A period set by the Canvas creator).

A user can mint an unclaimed cell by paying atleast `base_price` amount (set by the creator).
The value is transferred to the creator.

A user can gain ownership of a token which is already claimed by another user by paying
value (= last_bid_price + premium) which is transferred to the last owner. The premium percentage
is set by the Canvas creator during initialisation phase.

The owner of a token can change its color at any time during the bidding phase and if the canvas
was marked `Dynamic` by the creator then its color can be changed even after the bidding phase!