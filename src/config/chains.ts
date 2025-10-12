/**
 * Multi-Chain Configuration
 * Suporte para múltiplas redes blockchain
 */

export interface ChainConfig {
  id: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  explorerUrl: string;
  iconUrl: string;
  color: string;
  gasTrackerUrl?: string;
}

export const SUPPORTED_CHAINS: Record<string, ChainConfig> = {
  ethereum: {
    id: 1,
    name: 'Ethereum',
    symbol: 'ETH',
    rpcUrl: 'https://eth.llamarpc.com',
    explorerUrl: 'https://etherscan.io',
    iconUrl: '/chains/ethereum.svg',
    color: '#627EEA',
    gasTrackerUrl: 'https://etherscan.io/gastracker',
  },
  polygon: {
    id: 137,
    name: 'Polygon',
    symbol: 'MATIC',
    rpcUrl: 'https://polygon-rpc.com',
    explorerUrl: 'https://polygonscan.com',
    iconUrl: '/chains/polygon.svg',
    color: '#8247E5',
    gasTrackerUrl: 'https://polygonscan.com/gastracker',
  },
  bsc: {
    id: 56,
    name: 'BSC',
    symbol: 'BNB',
    rpcUrl: 'https://bsc-dataseed.binance.org',
    explorerUrl: 'https://bscscan.com',
    iconUrl: '/chains/bsc.svg',
    color: '#F3BA2F',
    gasTrackerUrl: 'https://bscscan.com/gastracker',
  },
  arbitrum: {
    id: 42161,
    name: 'Arbitrum',
    symbol: 'ETH',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    explorerUrl: 'https://arbiscan.io',
    iconUrl: '/chains/arbitrum.svg',
    color: '#28A0F0',
  },
  optimism: {
    id: 10,
    name: 'Optimism',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.optimism.io',
    explorerUrl: 'https://optimistic.etherscan.io',
    iconUrl: '/chains/optimism.svg',
    color: '#FF0420',
  },
  base: {
    id: 8453,
    name: 'Base',
    symbol: 'ETH',
    rpcUrl: 'https://mainnet.base.org',
    explorerUrl: 'https://basescan.org',
    iconUrl: '/chains/base.svg',
    color: '#0052FF',
  },
};

export const getChainById = (chainId: number): ChainConfig | undefined => {
  return Object.values(SUPPORTED_CHAINS).find(chain => chain.id === chainId);
};

export const getChainByName = (name: string): ChainConfig | undefined => {
  return SUPPORTED_CHAINS[name.toLowerCase()];
};
