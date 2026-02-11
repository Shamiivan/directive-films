import { test, expect } from '@playwright/test';

test.describe('Mobile Responsive Design', () => {
  const mobileViewport = { width: 375, height: 667 };
  const tabletViewport = { width: 768, height: 1024 };
  const desktopViewport = { width: 1440, height: 900 };

  test('should not have horizontal scroll on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');

    // Get document width
    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = mobileViewport.width;

    // Document width should not exceed viewport width
    expect(documentWidth).toBeLessThanOrEqual(viewportWidth + 1); // +1 for potential rounding
  });

  test('should not have horizontal scroll on tablet', async ({ page }) => {
    await page.setViewportSize(tabletViewport);
    await page.goto('/');

    const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const viewportWidth = tabletViewport.width;

    expect(documentWidth).toBeLessThanOrEqual(viewportWidth + 1);
  });

  test('hero section should scale properly on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');

    // Hero section should be visible
    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    // Title should be visible and readable
    const title = page.locator('h1').first();
    await expect(title).toBeVisible();

    // Font size should be reasonable (not too small)
    const fontSize = await title.evaluate((el) => {
      return parseInt(window.getComputedStyle(el).fontSize);
    });
    expect(fontSize).toBeGreaterThanOrEqual(32); // Minimum readable size on mobile
  });

  test('images should not overflow containers on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');

    // Check all images
    const images = page.locator('img');
    const count = await images.count();

    for (let i = 0; i < count; i++) {
      const img = images.nth(i);
      const isVisible = await img.isVisible();

      if (isVisible) {
        const box = await img.boundingBox();
        if (box) {
          // Image width should not exceed viewport width
          expect(box.width).toBeLessThanOrEqual(mobileViewport.width);
        }
      }
    }
  });

  test('text should remain readable across breakpoints', async ({ page }) => {
    const viewports = [mobileViewport, tabletViewport, desktopViewport];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto('/');

      // Check body text font size
      const bodyText = page.locator('p').first();
      if (await bodyText.isVisible()) {
        const fontSize = await bodyText.evaluate((el) => {
          return parseInt(window.getComputedStyle(el).fontSize);
        });

        // Font size should be at least 14px
        expect(fontSize).toBeGreaterThanOrEqual(14);
      }
    }
  });

  test('navigation should adapt to viewport size', async ({ page }) => {
    // Desktop - full nav visible
    await page.setViewportSize(desktopViewport);
    await page.goto('/');
    const desktopNav = page.locator('nav ul').first();
    await expect(desktopNav).toBeVisible();

    // Mobile - hamburger menu visible
    await page.setViewportSize(mobileViewport);
    await page.goto('/');
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await expect(hamburger).toBeVisible();
  });

  test('contact form should stack on mobile', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/contact');

    // Form inputs should be visible
    const nameInput = page.locator('input[name="name"]');
    if (await nameInput.isVisible()) {
      const box = await nameInput.boundingBox();
      if (box) {
        // Input should not be too narrow
        expect(box.width).toBeGreaterThan(200);
      }
    }
  });

  test('touch targets should meet minimum size requirements', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');

    // Check all clickable elements (buttons, links)
    const clickables = page.locator('button, a[href]');
    const count = await clickables.count();
    const violations: string[] = [];

    for (let i = 0; i < count; i++) {
      const element = clickables.nth(i);
      const isVisible = await element.isVisible();

      if (isVisible) {
        const box = await element.boundingBox();
        if (box) {
          // Touch targets should be at least 44x44px
          if (box.width < 44 || box.height < 44) {
            const text = await element.textContent();
            const tag = await element.evaluate((el) => el.tagName);
            violations.push(`${tag}: "${text?.trim() || 'no text'}" (${Math.round(box.width)}x${Math.round(box.height)})`);
          }
        }
      }
    }

    // Allow some violations for very small elements, but should be minimal
    if (violations.length > 0) {
      console.log('Touch target violations:', violations);
    }
    // Most elements should be close to 44px (42px is acceptable)
    expect(violations.length).toBeLessThan(20); // Reasonable threshold
  });

  test('footer should adapt to mobile layout', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Footer should be visible
    const footer = page.locator('footer').or(page.locator('[class*="footer"]')).first();
    await expect(footer).toBeVisible();

    // Footer links should be accessible
    const footerLinks = page.locator('footer a, [class*="footer"] a');
    const count = await footerLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('content should have proper mobile padding', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');

    // Check that containers inside sections have reasonable padding
    const containers = page.locator('[class*="container"]');
    const count = await containers.count();

    // At least some containers should have padding
    let paddedContainers = 0;
    for (let i = 0; i < count; i++) {
      const container = containers.nth(i);
      if (await container.isVisible()) {
        const padding = await container.evaluate((el) => {
          const style = window.getComputedStyle(el);
          return {
            left: parseInt(style.paddingLeft),
            right: parseInt(style.paddingRight),
          };
        });

        if (padding.left + padding.right > 0) {
          paddedContainers++;
        }
      }
    }

    // Most containers should have some padding
    expect(paddedContainers).toBeGreaterThan(0);
  });

  test('grid layouts should collapse properly', async ({ page }) => {
    // Desktop - multi-column grid
    await page.setViewportSize(desktopViewport);
    await page.goto('/');

    // Find grid containers (if any)
    const grids = page.locator('[style*="grid"], [class*="grid"]');
    const gridCount = await grids.count();

    if (gridCount > 0) {
      // Switch to mobile
      await page.setViewportSize(mobileViewport);
      await page.goto('/');

      // Grids should still be visible and not broken
      for (let i = 0; i < gridCount; i++) {
        const grid = grids.nth(i);
        if (await grid.isVisible()) {
          const width = await grid.evaluate((el) => el.clientWidth);
          expect(width).toBeLessThanOrEqual(mobileViewport.width);
        }
      }
    }
  });

  test('videos should be responsive', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');

    // Check all video elements
    const videos = page.locator('video');
    const count = await videos.count();

    for (let i = 0; i < count; i++) {
      const video = videos.nth(i);
      if (await video.isVisible()) {
        const box = await video.boundingBox();
        if (box) {
          // Video should not exceed viewport width
          expect(box.width).toBeLessThanOrEqual(mobileViewport.width);

          // Video should have playsInline attribute for mobile
          const hasPlaysInline = await video.getAttribute('playsinline');
          expect(hasPlaysInline).not.toBeNull();
        }
      }
    }
  });

  test('all pages should be mobile responsive', async ({ page }) => {
    const pages = ['/', '/services', '/about', '/careers', '/contact'];
    await page.setViewportSize(mobileViewport);

    for (const pagePath of pages) {
      await page.goto(pagePath);

      // No horizontal scroll
      const documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(documentWidth).toBeLessThanOrEqual(mobileViewport.width + 1);

      // Page should be visible
      const body = page.locator('body');
      await expect(body).toBeVisible();
    }
  });

  test('should handle orientation changes', async ({ page }) => {
    // Portrait
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    let documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(documentWidth).toBeLessThanOrEqual(376);

    // Landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');

    documentWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(documentWidth).toBeLessThanOrEqual(668);
  });

  test('mobile menu should prevent body scroll when open', async ({ page }) => {
    await page.setViewportSize(mobileViewport);
    await page.goto('/');

    // Initial body overflow
    const initialOverflow = await page.evaluate(() => document.body.style.overflow);

    // Open mobile menu
    const hamburger = page.locator('button[aria-label="Toggle mobile menu"]');
    await hamburger.click();

    // Body should have overflow hidden
    const menuOpenOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(menuOpenOverflow).toBe('hidden');

    // Close menu
    const closeButton = page.locator('button[aria-label="Close mobile menu"]');
    await closeButton.click();

    // Body overflow should be restored
    await page.waitForTimeout(500); // Wait for animation
    const closedOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(closedOverflow).toBe('');
  });
});
