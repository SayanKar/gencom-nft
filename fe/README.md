# Gencom Frontend

This is the frontend of our application. Try out the deployed version at [Gencom](https://gencom.vercel.app/).

To run this application on your local machine, follow the steps below:

Clone the repo on your local machine.
```bash
git clone https://github.com/SayanKar/gencom-nft.git
cd gencom-nft/fe
```

Install the npm packages, and start the development server.
```bash
npm install
npm start
```

Make sure to put the metadata of your contract in the file
`src/metadata.js`.

Take a look at the constants.js file to make network changes.
```javascript
//  Decimal of the network / 10^6
export const PRECISION = 1000_000;
// Symbol of the network
export const SYMBOL = "TZERO"; 
export const CONTRACT_ADDRESS =
  "5HEdBfVACfCYaK2YXeoWD2KRmUxxiShgKnK5RgCP149baSUr"; 
export const NETWORK_ENDPOINT = "wss://ws.test.azero.dev";
// gaslimit of each transaction
export const GAS_LIMIT = 10000n * 1000000n;
export const faucet = "https://faucet.test.azero.dev/";
```