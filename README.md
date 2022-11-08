# Gencom

Gencom provides a gamified way to create and own NFTs. The users compete and/or collaborate in a decentralized and permissionless manner to create pixelated art where each pixel represents a fractional nft of the overall artwork.  
Users bid on the pixels to gain ownership, allowing them to color that pixel. The bid amount goes to the last owner of that pixel. Thus in this way, each participant earns a profit from the sale and/or gets to own the fractional nft, which is a benefit of our Play-to-Earn (P2E) model.  
Usually, the NFTs obtained from the P2E games start losing their value once the game ends. To overcome this issue, We came up with a novel approach of having a dynamic state in our NFTs which opens up the possibility of a secondary market.  

We have developed this application using ink! smart contract, polkadot.js library and React.

## Description

TODO

## Novelty/Originality
  
* Gencom introduces the idea of collaborative art - Users can create digital artwork together in a decentralised and permissionless manner.

* Gencom uses the novel idea of fractionalizing the digital asset (artwork) into multiple NFTs.

* Gencom integrates the idea of Dynamic NFT, where the state of digital assets represented by the NFT can be changed even after minting.

## Technical complexity

### Smart Contract

TODO

### Frontend

In the frontend, we have developed a beautiful aesthetic UI using react and MUI. We didn’t want to use a backend so we had to optimally handle states to minimize rerendering. And we rendered the grid using SVG since it is lightweight and helped us in achieving a low-latency rendering. The initial iteration of our interface had a load time of 15+ seconds, which was reduced to < 1 second.

### Integration

The major issue was the lack of proper documentation of the polkadot-api library and the confusing output format returned by the API calls. We had to check the contract methods return type to decide where to read the response/error from, in some cases, we get it from the output field, and in the rest from the result field.

## Daily/mass usability

We believe NFTs are the best channel for crypto adoption for mass audiences. Such gamification of NFT generation and ownership will attract more users to the chain. Dynamic NFTs (aka Evolving NFTs) would be the new trend in the NFT space and allow for more innovation.

## Impact of project

* Our project is one of the early adopters of ink! smart contract and polkadot.js tech stack. It will act as a great source of reference for future builders and projects utilizing the given tech stack.

* We believe our project could be the one to popularize the concept of dynamic NFTs in the mainstream.

* We believe our unique and innovative project will help in developing the NFT space in the polkadot ecosystem. 

## Future work
* **Invite-only rooms:** it’ll allow only the invited users to participate in the bidding process.

* **Batch bidding feature:** it will help users to bid on multiple pixels in a single transaction, thus making the bidding process smoother and effortless.

* We plan to leverage the **subsocial platform** to provide a communication channel for better collaboration.

* Incorporate the following features in frontend:

    * Better visibility of high-traffic rooms in the trending section.
    * Increase the color options in the color palette.
    * Search and sort feature for finding relevant rooms.

    and many more…

* We plan to integrate with NFT marketplaces to facilitate the buying and selling of Gencom NFTs on secondary markets.

* Extend the support to **ERC1155** and **PSP34** standards.

## Tech Stack

* Ink! smart contract
* PolkadotJS library
* React
* MUI (Material UI)

## Team Members

1. Nimish Agrawal - realnimish@gmail.com

2. Sayan Kar - sayankar1308@gmail.com

3. Soumyajit Deb - debsoumyajit100@gmail.com