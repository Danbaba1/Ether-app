// src/App.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// ABI for the voting contract
const VOTING_CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_proposalId",
        "type": "uint256"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const VOTING_CONTRACT_ADDRESS = "0xB2E1185468e57A801a54162F27725CbD5B0EB4a6";

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [votingContract, setVotingContract] = useState(null);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) {
        setError('Please install MetaMask!');
        return;
      }

      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        const account = accounts[0];
        setAccount(account);
        await getBalance(account);
        setupVotingContract();
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      setError('Error connecting to wallet');
    }
  };

  const setupVotingContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        VOTING_CONTRACT_ADDRESS,
        VOTING_CONTRACT_ABI,
        signer
      );
      setVotingContract(contract);
    } catch (error) {
      console.error('Error setting up voting contract:', error);
      setError('Error setting up voting contract');
    }
  };

  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const account = accounts[0];
      setAccount(account);
      await getBalance(account);
      setupVotingContract();
      setSuccess('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError('Error connecting wallet');
    }
  };

  const getBalance = async (address) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const balance = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error('Error getting balance:', error);
      setError('Error getting balance');
    }
  };

  const sendETH = async () => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      const tx = await signer.sendTransaction({
        to: recipientAddress,
        value: ethers.utils.parseEther(amount)
      });

      await tx.wait();
      await getBalance(account);
      setSuccess('Transaction successful!');
      setRecipientAddress('');
      setAmount('');
    } catch (error) {
      console.error('Error sending ETH:', error);
      setError('Error sending ETH');
    } finally {
      setLoading(false);
    }
  };

  const castVote = async (proposalId) => {
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      if (!votingContract) {
        throw new Error('Voting contract not initialized');
      }

      const tx = await votingContract.vote(proposalId);
      await tx.wait();
      setSuccess(`Vote cast successfully for Proposal ${proposalId}!`);
    } catch (error) {
      console.error('Error casting vote:', error);
      setError('Error casting vote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">ETH DApp</h1>
        
        {!account ? (
          <button
            onClick={connectWallet}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Wallet Info</h2>
              <p>Account: {account}</p>
              <p>Balance: {balance} ETH</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Send ETH</h2>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Recipient Address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Amount in ETH"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded"
                />
                <button
                  onClick={sendETH}
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                >
                  {loading ? 'Processing...' : 'Send ETH'}
                </button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">Voting</h2>
              <div className="space-y-4">
                <button
                  onClick={() => castVote(1)}
                  disabled={loading}
                  className="bg-green-500 text-white px-4 py-2 rounded w-full"
                >
                  Vote for Proposal 1
                </button>
                <button
                  onClick={() => castVote(2)}
                  disabled={loading}
                  className="bg-purple-500 text-white px-4 py-2 rounded w-full"
                >
                  Vote for Proposal 2
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
