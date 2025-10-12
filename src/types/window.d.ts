/**
 * Global type declarations for browser extensions
 * Extends Window interface with MetaMask and other wallet providers
 */

interface EthereumProvider {
  isMetaMask?: boolean;
  request: (args: { method: string; params?: Array<unknown> }) => Promise<unknown>;
  on: (event: string, handler: (...args: Array<unknown>) => void) => void;
  removeListener: (event: string, handler: (...args: Array<unknown>) => void) => void;
  selectedAddress?: string | null;
  chainId?: string;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};
