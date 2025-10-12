import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { ethers } from 'ethers';

/**
 * WalletContext - Gerenciamento de estado da carteira
 * Security: Hardware wallet preferred, no private key storage
 */

type WalletType = 'metamask' | 'walletconnect' | 'ledger' | 'trezor';
type ChainId = 1 | 5 | 137 | 80001 | 56 | 97;

interface Account {
  address: string;
  balance: string;
  chainId: ChainId;
}

interface WalletState {
  connected: boolean;
  account: Account | null;
  walletType: WalletType | null;
  isConnecting: boolean;
  error: string | null;
}

interface TransactionRequest {
  to: string;
  value: string;
  data?: string;
  gasLimit?: string;
  gasPrice?: string;
}

interface WalletContextValue extends WalletState {
  connect: (type: WalletType) => Promise<void>;
  disconnect: () => void;
  sendTransaction: (tx: TransactionRequest) => Promise<string>;
  switchChain: (chainId: ChainId) => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WalletState>({
    connected: false,
    account: null,
    walletType: null,
    isConnecting: false,
    error: null,
  });

  const disconnect = useCallback(() => {
    setState({
      connected: false,
      account: null,
      walletType: null,
      isConnecting: false,
      error: null,
    });
  }, []);

  // Security: Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: unknown) => {
        const accountsList = accounts as string[];
        if (accountsList.length === 0) {
          disconnect();
        } else {
          // Update account
          setState((prev) => ({
            ...prev,
            account: prev.account ? { ...prev.account, address: accountsList[0] || '' } : null,
          }));
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum?.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum?.removeListener('chainChanged', handleChainChanged);
      };
    }
    return undefined;
  }, [disconnect]);

  const connect = useCallback(async (type: WalletType) => {
    setState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      if (type === 'metamask') {
        // Security: Check if MetaMask is installed
        if (!window.ethereum) {
          throw new Error('MetaMask not installed. Please install MetaMask extension.');
        }

        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }) as string[];
        
        if (!accounts || accounts.length === 0) {
          throw new Error('No accounts found');
        }

        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        const balance = await provider.getBalance(address);
        const network = await provider.getNetwork();

        setState({
          connected: true,
          account: {
            address,
            balance: balance.toString(),
            chainId: Number(network.chainId) as ChainId,
          },
          walletType: 'metamask',
          isConnecting: false,
          error: null,
        });
      } else if (type === 'walletconnect') {
        // TODO: Implement WalletConnect
        throw new Error('WalletConnect not yet implemented. Use MetaMask for now.');
      } else if (type === 'ledger' || type === 'trezor') {
        // TODO: Implement hardware wallet support
        throw new Error(`${type} support coming soon. Use MetaMask for now.`);
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error instanceof Error ? error.message : 'Failed to connect wallet',
      }));
      throw error;
    }
  }, []);

  const sendTransaction = useCallback(async (tx: TransactionRequest): Promise<string> => {
    if (!state.connected || !window.ethereum) {
      throw new Error('Wallet not connected');
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Security: Validate transaction parameters
      if (!ethers.isAddress(tx.to)) {
        throw new Error('Invalid recipient address');
      }

      // Send transaction
      const transaction = await signer.sendTransaction({
        to: tx.to,
        value: ethers.parseEther(tx.value),
        data: tx.data || '0x',
        gasLimit: tx.gasLimit ? BigInt(tx.gasLimit) : undefined,
        gasPrice: tx.gasPrice ? BigInt(tx.gasPrice) : undefined,
      });

      return transaction.hash;
    } catch (error) {
      console.error('Transaction error:', error);
      throw error;
    }
  }, [state]);

  const switchChain = useCallback(async (chainId: ChainId) => {
    if (!window.ethereum) {
      throw new Error('Wallet not connected');
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });
    } catch (error) {
      console.error('Switch chain error:', error);
      throw error;
    }
  }, []);

  return (
    <WalletContext.Provider
      value={{
        connected: state.connected,
        account: state.account,
        walletType: state.walletType,
        isConnecting: state.isConnecting,
        error: state.error,
        connect,
        disconnect,
        sendTransaction,
        switchChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
