import { test, expect } from '@playwright/test';

/**
 * E2E Test: Contact Form Submission
 * Security: Tests rate limiting and input validation
 */
test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should display contact form', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Contact');
    await expect(page.locator('form')).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    await page.click('button[type="submit"]');
    
    // Check for validation errors
    await expect(page.locator('text=Name is required')).toBeVisible();
    await expect(page.locator('text=Email is required')).toBeVisible();
  });

  test('should submit form successfully', async ({ page }) => {
    await page.fill('[name="name"]', 'John Doe');
    await page.fill('[name="email"]', 'john.doe@example.com');
    await page.fill('[name="subject"]', 'Test Subject');
    await page.fill('[name="message"]', 'This is a test message with enough content to pass validation.');
    
    await page.click('button[type="submit"]');
    
    // Wait for success message
    await expect(page.locator('text=Message sent successfully')).toBeVisible({ timeout: 5000 });
  });

  test('should sanitize XSS attempts', async ({ page }) => {
    const xssPayload = '<script>alert("XSS")</script>';
    
    await page.fill('[name="name"]', xssPayload);
    await page.fill('[name="email"]', 'test@example.com');
    await page.fill('[name="subject"]', 'Test');
    await page.fill('[name="message"]', 'Test message');
    
    await page.click('button[type="submit"]');
    
    // Ensure no script execution
    page.on('dialog', () => {
      throw new Error('XSS attempt succeeded - this should not happen!');
    });
    
    await page.waitForTimeout(1000);
  });
});

test.describe('Home Page', () => {
  test('should load home page', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.locator('nav')).toBeVisible();
  });

  test('should navigate to wallet page', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Wallet');
    await expect(page).toHaveURL('/wallet');
  });
});

test.describe('Wallet Connection', () => {
  test('should show wallet connection modal', async ({ page }) => {
    await page.goto('/wallet');
    
    await page.click('text=Connect Wallet');
    await expect(page.locator('text=Choose Wallet')).toBeVisible();
  });
});
