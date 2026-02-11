import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } }); // iPhone SE size

  test('should show hamburger menu on mobile', async ({ page }) => {
    await page.goto('/');

    // Hamburger button should be visible
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(hamburger).toBeVisible();

    // Desktop nav list should be hidden
    const desktopNav = page.locator('nav ul').first();
    await expect(desktopNav).toBeHidden();
  });

  test('should open mobile menu when hamburger is clicked', async ({ page }) => {
    await page.goto('/');

    // Click hamburger button
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburger.click();

    // Mobile menu should be visible
    const mobileMenu = page.locator('[class*="mobileMenu"]');
    await expect(mobileMenu).toBeVisible();

    // All navigation links should be visible
    await expect(page.locator('text=HOME').last()).toBeVisible();
    await expect(page.locator('text=SERVICES').last()).toBeVisible();
    await expect(page.locator('text=ABOUT US').last()).toBeVisible();
    await expect(page.locator('text=CAREERS').last()).toBeVisible();
    await expect(page.locator('text=Contact Us').last()).toBeVisible();
  });

  test('should close mobile menu when close button is clicked', async ({ page }) => {
    await page.goto('/');

    // Open menu
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburger.click();

    // Wait for menu to be visible
    const mobileMenu = page.locator('[class*="mobileMenu"]');
    await expect(mobileMenu).toBeVisible();

    // Click close button
    const closeButton = page.locator('button[aria-label="Close mobile menu"]');
    await closeButton.click();

    // Menu should be hidden
    await expect(mobileMenu).toBeHidden();
  });

  test('should close mobile menu when backdrop is clicked', async ({ page }) => {
    await page.goto('/');

    // Open menu
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburger.click();

    // Wait for menu to be visible
    const mobileMenu = page.locator('[class*="mobileMenu"]');
    await expect(mobileMenu).toBeVisible();

    // Click backdrop
    const backdrop = page.locator('[class*="mobileBackdrop"]');
    await backdrop.click();

    // Menu should be hidden
    await expect(mobileMenu).toBeHidden();
  });

  test('should close mobile menu when link is clicked', async ({ page }) => {
    await page.goto('/');

    // Open menu
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburger.click();

    // Wait for menu to be visible
    const mobileMenu = page.locator('[class*="mobileMenu"]');
    await expect(mobileMenu).toBeVisible();

    // Click a navigation link
    const homeLink = page.locator('[class*="mobileNavList"] a[href="/"]').first();
    await homeLink.click();

    // Wait for navigation
    await page.waitForURL('/');

    // Menu should be hidden
    await expect(mobileMenu).toBeHidden();
  });

  test('should close mobile menu on Escape key', async ({ page }) => {
    await page.goto('/');

    // Open menu
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburger.click();

    // Wait for menu to be visible
    const mobileMenu = page.locator('[class*="mobileMenu"]');
    await expect(mobileMenu).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Menu should be hidden
    await expect(mobileMenu).toBeHidden();
  });

  test('hamburger button should meet minimum touch target size (44px)', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    const box = await hamburger.boundingBox();

    expect(box).not.toBeNull();
    if (box) {
      expect(box.width).toBeGreaterThanOrEqual(44);
      expect(box.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('mobile menu links should have adequate touch targets (min 48px height)', async ({ page }) => {
    await page.goto('/');

    // Open menu
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburger.click();

    // Check all mobile nav links
    const mobileLinks = page.locator('[class*="mobileNavList"] li a');
    const count = await mobileLinks.count();

    for (let i = 0; i < count; i++) {
      const link = mobileLinks.nth(i);
      const box = await link.boundingBox();

      expect(box).not.toBeNull();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('should have proper ARIA attributes', async ({ page }) => {
    await page.goto('/');

    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');

    // Initially aria-expanded should be false
    await expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    // Click to open
    await hamburger.click();

    // Now aria-expanded should be true
    await expect(hamburger).toHaveAttribute('aria-expanded', 'true');
  });

  test('should work across different mobile viewports', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 390, height: 844, name: 'iPhone 13' },
      { width: 393, height: 851, name: 'Pixel 5' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Hamburger should be visible
      const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
      await expect(hamburger).toBeVisible();

      // Desktop nav should be hidden
      const desktopNav = page.locator('nav ul').first();
      await expect(desktopNav).toBeHidden();

      // Should be able to open menu
      await hamburger.click();
      const mobileMenu = page.locator('[class*="mobileMenu"]');
      await expect(mobileMenu).toBeVisible();

      // Close for next iteration
      const closeButton = page.locator('button[aria-label="Close mobile menu"]');
      await closeButton.click();
      await expect(mobileMenu).toBeHidden();
    }
  });
});
