// Core types for wallet and blockchain interactions

export type WalletType = 'metamask' | 'walletconnect' | 'ledger' | 'trezor' | 'coinbase';

export type ChainId = 1 | 5 | 11155111 | 137 | 80001; // Mainnet, Goerli, Sepolia, Polygon, Mumbai

export interface WalletAccount {
  address: string;
  balance: string; // Wei as string to avoid precision loss
  chainId: ChainId;
  ensName?: string;
}

export interface WalletState {
  connected: boolean;
  account: WalletAccount | null;
  walletType: WalletType | null;
  isConnecting: boolean;
  error: string | null;
}

export interface Transaction {
  hash: string;
  from: string;
  to: string;
  value: string; // Wei as string
  gasPrice?: string;
  gasLimit?: string;
  nonce: number;
  data?: string;
  chainId: ChainId;
  timestamp?: number;
  status?: 'pending' | 'confirmed' | 'failed';
  blockNumber?: number;
}

export interface TransactionRequest {
  to: string;
  value: string;
  data?: string;
  gasLimit?: string;
  gasPrice?: string;
}

export interface Block {
  number: number;
  hash: string;
  timestamp: number;
  transactions: string[];
  gasUsed: string;
  gasLimit: string;
  miner: string;
}

export interface GasEstimate {
  gasLimit: string;
  gasPrice: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
  estimatedCost: string; // In ETH
}
