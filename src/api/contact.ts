import { apiClient } from './client';
import type { ContactFormData, ApiResponse } from '@types';

/**
 * Contact form API
 * Security: All input is sanitized in the API client
 */

export async function submitContactForm(data: ContactFormData): Promise<ApiResponse<void>> {
  // TODO: Replace with actual API endpoint
  // Mock implementation for development
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: undefined,
        message: 'Message sent successfully!',
        timestamp: Date.now(),
      });
    }, 1000);
  });

  // Production implementation:
  // return apiClient.post<void>('/contact', data);
}
