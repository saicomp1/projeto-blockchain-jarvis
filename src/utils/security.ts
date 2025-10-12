import DOMPurify from 'dompurify';

/**
 * Security utility functions
 * Critical: Used throughout the application to prevent XSS and other attacks
 */

/**
 * Sanitize HTML content to prevent XSS attacks
 * Security: Uses DOMPurify with strict configuration
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'p', 'br', 'ul', 'ol', 'li', 'code', 'pre'],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
    KEEP_CONTENT: true,
  });
}

/**
 * Validate and sanitize user input
 * Security: Removes potentially dangerous characters
 */
export function sanitizeInput(input: string): string {
  // Remove null bytes and control characters
  return input.replace(/[\x00-\x1F\x7F]/g, '').trim();
}

/**
 * Generate a secure random string (for client-side nonces)
 * Security: Uses crypto.getRandomValues
 */
export function generateSecureRandom(length = 32): string {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Hash string using SubtleCrypto (for client-side checksums)
 * Security: SHA-256 hashing
 */
export async function hashString(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Validate Content Security Policy nonce
 * Security: Ensures inline scripts/styles have valid nonces
 */
export function isValidNonce(nonce: string): boolean {
  // Nonce should be base64 and at least 128 bits (22 characters)
  return /^[A-Za-z0-9+/]{22,}={0,2}$/.test(nonce);
}

/**
 * Rate limiter for client-side request throttling
 * Security: Prevents abuse and DoS
 */
export class RateLimiter {
  private requests: number[] = [];
  
  constructor(
    private maxRequests: number,
    private timeWindowMs: number
  ) {}
  
  canMakeRequest(): boolean {
    const now = Date.now();
    this.requests = this.requests.filter((timestamp) => now - timestamp < this.timeWindowMs);
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    
    return false;
  }
  
  getWaitTime(): number {
    if (this.requests.length < this.maxRequests) return 0;
    
    const oldestRequest = this.requests[0];
    if (!oldestRequest) return 0;
    
    return this.timeWindowMs - (Date.now() - oldestRequest);
  }
}

/**
 * Validate URL to prevent open redirect vulnerabilities
 * Security: Ensures URLs are safe to navigate to
 */
export function isValidUrl(url: string, allowedDomains?: string[]): boolean {
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    
    // Check allowed domains if provided
    if (allowedDomains && allowedDomains.length > 0) {
      return allowedDomains.some((domain) => parsed.hostname.endsWith(domain));
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Mask sensitive data for logging
 * Security: Prevents sensitive data from appearing in logs
 */
export function maskSensitiveData(data: string, visibleChars = 4): string {
  if (data.length <= visibleChars * 2) {
    return '*'.repeat(data.length);
  }
  
  return `${data.slice(0, visibleChars)}${'*'.repeat(data.length - visibleChars * 2)}${data.slice(-visibleChars)}`;
}
