# SendETH and Voting DApp

This decentralized application (DApp) allows users to connect their Ethereum wallet, send ETH to other addresses, and participate in a voting system on the Sepolia testnet.

## Features

- Wallet connection using MetaMask
- View account balance
- Send ETH to other addresses
- Vote on proposals using a smart contract

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MetaMask browser extension
- Some Sepolia testnet ETH

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd eth-dapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required packages:
```bash
npm install ethers@5.7.2 react
# or
yarn add ethers@5.7.2 react
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

## Usage

1. **Connect Wallet**
   - Click the "Connect Wallet" button
   - Approve the connection in MetaMask
   - Your account address and balance will be displayed

2. **Sending ETH**
   - Enter the recipient's Ethereum address
   - Enter the amount of ETH to send
   - Click "Send ETH"
   - Confirm the transaction in MetaMask

3. **Voting**
   - Click "Vote for Proposal 1" or "Vote for Proposal 2"
   - Confirm the transaction in MetaMask
   - Wait for transaction confirmation

## Architecture

The DApp is built using:
- React for the frontend
- ethers.js for Ethereum interaction
- MetaMask for wallet connection
- Tailwind CSS for styling

### Key Components:

1. **Wallet Connection**
   - Uses Web3Provider from ethers.js
   - Connects to MetaMask
   - Retrieves account info and balance

2. **ETH Transfer**
   - Uses signer.sendTransaction
   - Handles transaction confirmation
   - Updates balance after successful transfer

3. **Voting Contract Integration**
   - Contract Address: 0xB2E1185468e57A801a54162F27725CbD5B0EB4a6
   - Implements vote function
   - Handles proposal selection (1 or 2)

## Security Considerations

- Always verify transaction details in MetaMask
- Keep your private keys secure
- Double-check recipient addresses
- Test with small amounts first

## Network

This DApp is configured to work with:
- Sepolia testnet (for voting)
- Any network supported by MetaMask (for ETH transfers)

## Error Handling

The DApp includes comprehensive error handling for:
- Wallet connection issues
- Transaction failures
- Contract interaction errors
- Network issues

## Support

For issues or questions:
1. Check the console for detailed error messages
2. Ensure MetaMask is properly configured
3. Verify you have sufficient ETH for gas fees
