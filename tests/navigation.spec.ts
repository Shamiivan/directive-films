import { test, expect } from '@playwright/test';

test.describe('Navigation Links Test', () => {
  const baseURL = 'http://localhost:3001';

  test('should verify all navigation links work', async ({ page }) => {
    // Start dev server first - run `pnpm dev` before this test
    await page.goto(baseURL);

    // Wait for page to load
    await page.waitForLoadState('networkidle');

    console.log('\n📋 Testing Navigation Links...\n');

    // Get all navigation links
    const navLinks = await page.locator('nav a').all();
    const results: { text: string; href: string; status: string }[] = [];

    for (const link of navLinks) {
      const text = (await link.textContent()) || '';
      const href = (await link.getAttribute('href')) || '';

      console.log(`Testing: ${text.trim()} → ${href}`);

      try {
        // Click the link
        await link.click();

        // Wait for navigation
        await page.waitForLoadState('networkidle');

        // Check if page loaded successfully
        const url = page.url();
        const title = await page.title();

        results.push({
          text: text.trim(),
          href,
          status: '✅ SUCCESS'
        });

        console.log(`  ✅ Loaded: ${url}`);
        console.log(`  📄 Title: ${title}\n`);

        // Go back to homepage for next test
        await page.goto(baseURL);
        await page.waitForLoadState('networkidle');

      } catch (error) {
        results.push({
          text: text.trim(),
          href,
          status: `❌ FAILED: ${error}`
        });
        console.log(`  ❌ Failed to load\n`);
      }
    }

    // Print summary
    console.log('\n📊 Summary:\n');
    results.forEach(result => {
      console.log(`${result.status} - ${result.text} (${result.href})`);
    });

    // All links should work
    const failedLinks = results.filter(r => r.status.includes('FAILED'));
    expect(failedLinks.length).toBe(0);
  });

  test('should verify all pages exist', async ({ page }) => {
    const pages = [
      { path: '/', name: 'Home' },
      { path: '/services', name: 'Services' },
      { path: '/about', name: 'About' },
      { path: '/careers', name: 'Careers' },
      { path: '/contact', name: 'Contact' },
    ];

    console.log('\n🔍 Testing Page Existence...\n');

    for (const { path, name } of pages) {
      console.log(`Testing ${name} page: ${path}`);

      const response = await page.goto(`${baseURL}${path}`);

      expect(response?.status()).toBe(200);
      console.log(`  ✅ ${name} page loaded successfully (200)\n`);
    }
  });

  test('should check for broken links', async ({ page }) => {
    await page.goto(baseURL);
    await page.waitForLoadState('networkidle');

    console.log('\n🔗 Checking for broken links...\n');

    // Get all links on the page
    const allLinks = await page.locator('a[href]').all();
    const brokenLinks: string[] = [];

    for (const link of allLinks) {
      const href = await link.getAttribute('href');

      if (!href) continue;

      // Skip external links and anchors
      if (href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        continue;
      }

      try {
        const response = await page.goto(`${baseURL}${href}`);
        const status = response?.status();

        if (status !== 200) {
          brokenLinks.push(`${href} (Status: ${status})`);
          console.log(`  ❌ Broken: ${href} (${status})`);
        } else {
          console.log(`  ✅ OK: ${href}`);
        }

        // Go back for next test
        await page.goto(baseURL);
      } catch (error) {
        brokenLinks.push(`${href} (Error: ${error})`);
        console.log(`  ❌ Error: ${href}`);
      }
    }

    console.log(`\n📊 Total broken links: ${brokenLinks.length}\n`);

    if (brokenLinks.length > 0) {
      console.log('Broken links:');
      brokenLinks.forEach(link => console.log(`  - ${link}`));
    }

    expect(brokenLinks.length).toBe(0);
  });
});
