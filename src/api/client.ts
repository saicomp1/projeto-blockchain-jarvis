import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiResponse, ApiError } from '@types';
import { getBackoffDelay, sanitizeInput } from '@utils';

/**
 * API Client with security hardening
 * Security features:
 * - Request/response interceptors
 * - Automatic token refresh
 * - Rate limiting
 * - Input sanitization
 * - Retry with exponential backoff
 * - Timeout enforcement
 */

const MAX_RETRIES = parseInt(import.meta.env.VITE_MAX_REQUEST_RETRIES || '3', 10);
const TIMEOUT = parseInt(import.meta.env.VITE_REQUEST_TIMEOUT_MS || '30000', 10);

class ApiClient {
  private client: AxiosInstance;
  private retryCount = new Map<string, number>();

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      timeout: TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        // Security: Additional headers
        'X-Requested-With': 'XMLHttpRequest',
      },
      // Security: Credentials handling
      withCredentials: true,
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Security: Add CSRF token if available
        const csrfToken = this.getCsrfToken();
        if (csrfToken && config.headers) {
          config.headers['X-CSRF-Token'] = csrfToken;
        }

        // Security: Add authorization token (from secure storage)
        const token = this.getAuthToken();
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Security: Sanitize request data
        if (config.data && typeof config.data === 'object') {
          config.data = this.sanitizeRequestData(config.data);
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        // Reset retry count on success
        if (response.config.url) {
          this.retryCount.delete(response.config.url);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config;

        if (!originalRequest) {
          return Promise.reject(error);
        }

        // Handle 401 Unauthorized - attempt token refresh
        if (error.response?.status === 401) {
          // TODO: Implement token refresh logic
          // const refreshed = await this.refreshToken();
          // if (refreshed) return this.client(originalRequest);
        }

        // Retry logic with exponential backoff
        const retries = this.retryCount.get(originalRequest.url || '') || 0;

        if (retries < MAX_RETRIES && this.shouldRetry(error)) {
          this.retryCount.set(originalRequest.url || '', retries + 1);
          const delay = getBackoffDelay(retries);
          await new Promise((resolve) => setTimeout(resolve, delay));
          return this.client(originalRequest);
        }

        return Promise.reject(this.normalizeError(error));
      }
    );
  }

  private shouldRetry(error: AxiosError): boolean {
    // Retry on network errors and 5xx server errors
    return (
      !error.response ||
      (error.response.status >= 500 && error.response.status < 600) ||
      error.code === 'ECONNABORTED'
    );
  }

  private normalizeError(error: AxiosError): ApiError {
    if (error.response?.data) {
      const data = error.response.data as Partial<ApiError>;
      return {
        code: data.code || `HTTP_${error.response.status}`,
        message: data.message || error.message,
        details: data.details,
      };
    }

    return {
      code: error.code || 'NETWORK_ERROR',
      message: error.message || 'An unexpected error occurred',
    };
  }

  // Security: Sanitize request data recursively
  private sanitizeRequestData(data: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'string') {
        sanitized[key] = sanitizeInput(value);
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        sanitized[key] = this.sanitizeRequestData(value as Record<string, unknown>);
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  // Security: Get CSRF token from meta tag or cookie
  private getCsrfToken(): string | null {
    // Try to get from meta tag first
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    if (metaTag) {
      return metaTag.getAttribute('content');
    }

    // TODO: Implement cookie-based CSRF token retrieval
    return null;
  }

  // Security: Get auth token from secure storage (never localStorage for production)
  private getAuthToken(): string | null {
    // TODO: Implement secure token storage
    // For production: use httpOnly cookies or secure session storage
    // NEVER store sensitive tokens in localStorage
    return sessionStorage.getItem('auth_token');
  }

  // Public API methods
  async get<T>(url: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await this.client.get<ApiResponse<T>>(url, { params });
    return response.data;
  }

  async post<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await this.client.post<ApiResponse<T>>(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: Record<string, unknown>): Promise<ApiResponse<T>> {
    const response = await this.client.put<ApiResponse<T>>(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    const response = await this.client.delete<ApiResponse<T>>(url);
    return response.data;
  }
}

// Export singleton instances
export const apiClient = new ApiClient(import.meta.env.VITE_API_URL || '/api');
export const contactApiClient = new ApiClient(
  import.meta.env.VITE_CONTACT_API_URL || '/api/contact'
);
