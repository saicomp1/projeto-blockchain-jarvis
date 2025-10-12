import type { Transaction, Block, NetworkMetrics, ApiResponse, PaginatedResponse } from '@types';

/**
 * Blockchain explorer API
 * Security: All requests go through the secured API client
 */

export function getTransaction(hash: string): Promise<ApiResponse<Transaction>> {
  // TODO: Replace with actual API endpoint
  // Mock implementation for development
  return Promise.resolve({
    success: true,
    data: {
      hash,
      from: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      to: '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
      value: '1000000000000000000',
      nonce: 1,
      chainId: 1,
      timestamp: Date.now(),
      status: 'confirmed',
      blockNumber: 12345678,
    },
    timestamp: Date.now(),
  });

  // Production implementation:
  // return apiClient.get<Transaction>(`/transactions/${hash}`);
}

export function getBlock(blockNumber: number): Promise<ApiResponse<Block>> {
  // TODO: Replace with actual API endpoint
  return Promise.resolve({
    success: true,
    data: {
      number: blockNumber,
      hash: '0x' + '0'.repeat(64),
      timestamp: Date.now(),
      transactions: [],
      gasUsed: '0',
      gasLimit: '0',
      miner: '0x' + '0'.repeat(40),
    },
    timestamp: Date.now(),
  });

  // Production implementation:
  // return apiClient.get<Block>(`/blocks/${blockNumber}`);
}

export function getTransactions(
  address: string,
  page = 1,
  pageSize = 10
): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
  // TODO: Replace with actual API endpoint
  void address; // Mark as intentionally unused
  return Promise.resolve({
    success: true,
    data: {
      items: [],
      total: 0,
      page,
      pageSize,
      hasMore: false,
    },
    timestamp: Date.now(),
  });

  // Production implementation:
  // return apiClient.get<PaginatedResponse<Transaction>>(`/addresses/${address}/transactions`, {
  //   page,
  //   pageSize,
  // });
}

export function getNetworkMetrics(): Promise<ApiResponse<NetworkMetrics>> {
  // TODO: Replace with actual API endpoint
  return Promise.resolve({
    success: true,
    data: {
      blockHeight: 12345678,
      difficulty: '12345678901234567890',
      hashRate: '500 TH/s',
      transactions24h: 1234567,
      activeAddresses: 987654,
      gasPrice: {
        low: '20000000000',
        medium: '25000000000',
        high: '30000000000',
      },
    },
    timestamp: Date.now(),
  });

  // Production implementation:
  // return apiClient.get<NetworkMetrics>('/network/metrics');
}
