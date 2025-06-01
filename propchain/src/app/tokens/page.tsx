"use client";

import { useState, useEffect } from 'react';
import { useAccount, useBalance, useWriteContract, useReadContract } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ["latin"] });

// Contract ABI - only the functions we need
const contractABI = [
  {
    "inputs": [],
    "name": "balanceOf",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {"type": "address", "name": "to"},
      {"type": "uint256", "name": "amount"}
    ],
    "name": "transfer",
    "outputs": [{"type": "bool"}],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

// Contract address on Sepolia
const CONTRACT_ADDRESS = "0x678A30C8e2F4f38A2aC113c934Bf2aE6d07590d8";

// Client-side only component
function TokenContent() {
  const { address, isConnected } = useAccount();
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<{
    name: string;
    symbol: string;
    totalSupply: string;
  } | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Read token balance
  const { data: balance, isLoading: isBalanceLoading } = useBalance({
    address,
    token: CONTRACT_ADDRESS as `0x${string}`,
  });

  // Read token info
  const { data: tokenName } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'name',
  });

  const { data: tokenSymbol } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'symbol',
  });

  const { data: totalSupply } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractABI,
    functionName: 'totalSupply',
  });

  // Write transfer function
  const { writeContract, isPending } = useWriteContract();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (tokenName && tokenSymbol && totalSupply) {
      setTokenInfo({
        name: tokenName as string,
        symbol: tokenSymbol as string,
        totalSupply: formatEther(totalSupply as bigint),
      });
    }
  }, [tokenName, tokenSymbol, totalSupply]);

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipientAddress || !amount) return;

    try {
      setIsLoading(true);
      setError(null);
      
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractABI,
        functionName: 'transfer',
        args: [recipientAddress, parseEther(amount)],
      });

      // Reset form
      setRecipientAddress('');
      setAmount('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state on server-side
  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-32"></div>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="animate-pulse h-8 bg-gray-200 rounded w-32"></div>
        </div>
      </div>
    );
  }

  // Show connect wallet message if not connected
  if (!isConnected) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Please connect your wallet to view your token balance and transfer tokens.</p>
      </div>
    );
  }

  return (
    <>
      {/* Token Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Your Balance</h2>
          {isBalanceLoading ? (
            <div className="animate-pulse h-8 bg-gray-200 rounded w-32"></div>
          ) : (
            <p className="text-2xl font-bold text-[#ea9800]">
              {balance ? formatEther(balance.value) : '0'} {tokenInfo?.symbol || 'DMG'}
            </p>
          )}
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Total Supply</h2>
          <p className="text-2xl font-bold text-[#ea9800]">
            {tokenInfo?.totalSupply || '0'} {tokenInfo?.symbol || 'DMG'}
          </p>
        </div>
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Contract Address</h2>
          <p className="text-sm font-mono text-gray-600 break-all">
            {CONTRACT_ADDRESS}
          </p>
        </div>
      </div>

      {/* Transfer Form */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Transfer Tokens</h2>
        <form onSubmit={handleTransfer} className="space-y-6">
          <div>
            <label htmlFor="recipient" className="block text-sm font-medium text-gray-700 mb-2">
              Recipient Address
            </label>
            <input
              type="text"
              id="recipient"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ea9800] focus:border-[#ea9800]"
              placeholder="0x..."
              required
            />
          </div>

          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
              Amount ({tokenInfo?.symbol || 'DMG'})
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#ea9800] focus:border-[#ea9800]"
              placeholder="0.0"
              step="0.000000000000000001"
              required
            />
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <a
            href="#"
            role="button"
            tabIndex={0}
            onClick={handleTransfer}
            className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-[#ea9800] transition-colors duration-300 mx-auto block md:inline-block uppercase"
            style={{ letterSpacing: '0.06em' }}
          >
            {isLoading || isPending ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Transfer Tokens'
            )}
          </a>
        </form>
      </div>

      {/* Transaction History Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Transactions</h2>
        <div className="bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-600 text-center">Transaction history will be available soon...</p>
        </div>
      </div>
    </>
  );
}

// Main page component
export default function TokensPage() {
  return (
    <div className={`min-h-screen flex flex-col bg-white ${montserrat.className}`}>
      <Header />
      {/* Decorative background image */}
      <div
        style={{
          height: '1000px',
          width: '100vw',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundImage: "url('/images/main2.jpg')",
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 mt-20" style={{ position: 'relative', zIndex: 2, marginTop: '120px' }}>
        <div className="bg-white shadow-lg p-8">
          <h1 className="text-3xl font-semibold mb-8" style={{ fontFamily: 'Kaftan, serif', fontWeight: 400 }}>
            Dubai Marina Gate Tower 2 Token (DMG)
          </h1>
          <TokenContent />
        </div>
      </main>
      <div className="-mt-1 z-1">
        <Footer />
      </div>
    </div>
  );
} 