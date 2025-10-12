// API response types

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NetworkMetrics {
  blockHeight: number;
  difficulty: string;
  hashRate: string;
  transactions24h: number;
  activeAddresses: number;
  gasPrice: {
    low: string;
    medium: string;
    high: string;
  };
}
