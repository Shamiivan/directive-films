import { test, expect } from '@playwright/test';

test.describe('Image Accessibility - High-impact creative section', () => {
  test('should check all images have descriptive alt text', async ({ page }) => {
    await page.goto('/');

    // Wait for images to load
    await page.waitForLoadState('networkidle');

    // Get all images on the page
    const images = page.locator('img');
    const imageCount = await images.count();

    console.log(`\n=== Found ${imageCount} images on the page ===\n`);

    const imageAccessibility: Array<{
      src: string;
      alt: string;
      isAccessible: boolean;
      issue?: string;
    }> = [];

    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src') || '';
      const alt = await img.getAttribute('alt') || '';

      let isAccessible = true;
      let issue: string | undefined;

      // Check various accessibility issues
      if (!alt) {
        isAccessible = false;
        issue = 'Missing alt attribute';
      } else if (alt.trim() === '') {
        isAccessible = false;
        issue = 'Empty alt text';
      } else if (alt.match(/^Portfolio \d+$/)) {
        isAccessible = false;
        issue = 'Generic alt text (Portfolio #) - not descriptive';
      } else if (alt.match(/^Image \d+$/i)) {
        isAccessible = false;
        issue = 'Generic alt text (Image #) - not descriptive';
      } else if (alt.match(/^Photo \d+$/i)) {
        isAccessible = false;
        issue = 'Generic alt text (Photo #) - not descriptive';
      } else if (alt.length < 5) {
        isAccessible = false;
        issue = 'Alt text too short (less than 5 characters)';
      }

      imageAccessibility.push({
        src: src.substring(0, 80) + (src.length > 80 ? '...' : ''),
        alt,
        isAccessible,
        issue,
      });

      // Log each image
      const status = isAccessible ? '✅' : '❌';
      console.log(`${status} Image ${i + 1}:`);
      console.log(`   Source: ${src.substring(0, 80)}${src.length > 80 ? '...' : ''}`);
      console.log(`   Alt text: "${alt}"`);
      if (!isAccessible) {
        console.log(`   ⚠️  Issue: ${issue}`);
      }
      console.log('');
    }

    // Summary
    const accessibleCount = imageAccessibility.filter(img => img.isAccessible).length;
    const inaccessibleCount = imageAccessibility.filter(img => !img.isAccessible).length;

    console.log('\n=== SUMMARY ===');
    console.log(`Total images: ${imageCount}`);
    console.log(`✅ Accessible: ${accessibleCount}`);
    console.log(`❌ Inaccessible: ${inaccessibleCount}`);

    if (inaccessibleCount > 0) {
      console.log('\n=== IMAGES NEEDING FIXES ===');
      imageAccessibility
        .filter(img => !img.isAccessible)
        .forEach((img, idx) => {
          console.log(`\n${idx + 1}. ${img.issue}`);
          console.log(`   Source: ${img.src}`);
          console.log(`   Current alt: "${img.alt}"`);
        });
    }

    // The test should pass but we want to see the report
    // Uncomment the line below if you want the test to fail when images are inaccessible
    // expect(inaccessibleCount).toBe(0);
  });

  test('should specifically check "High-impact creative" section images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find the section with "High-impact creative" text
    const sectionHeading = page.locator('text=High-impact creative');
    await expect(sectionHeading).toBeVisible();

    // Get the section container
    const section = sectionHeading.locator('xpath=ancestor::section');

    // Get all images within this section
    const sectionImages = section.locator('img');
    const count = await sectionImages.count();

    console.log(`\n=== High-impact creative section has ${count} images ===\n`);

    const issues: string[] = [];

    for (let i = 0; i < count; i++) {
      const img = sectionImages.nth(i);
      const src = await img.getAttribute('src') || '';
      const alt = await img.getAttribute('alt') || '';

      console.log(`Image ${i + 1}:`);
      console.log(`  Source: ${src.substring(0, 60)}...`);
      console.log(`  Alt: "${alt}"`);

      // Check if alt text is descriptive
      if (alt.match(/^Portfolio \d+$/)) {
        const issue = `Image ${i + 1}: Generic "Portfolio #" alt text - not accessible`;
        issues.push(issue);
        console.log(`  ❌ ${issue}`);
      } else if (!alt || alt.trim() === '') {
        const issue = `Image ${i + 1}: Missing or empty alt text`;
        issues.push(issue);
        console.log(`  ❌ ${issue}`);
      } else {
        console.log(`  ✅ Has descriptive alt text`);
      }
      console.log('');
    }

    if (issues.length > 0) {
      console.log('\n=== ISSUES FOUND ===');
      issues.forEach(issue => console.log(`❌ ${issue}`));
      console.log('\n=== RECOMMENDATION ===');
      console.log('Replace generic "Portfolio 1", "Portfolio 2" alt text with descriptive text like:');
      console.log('  - "Video production crew filming corporate interview"');
      console.log('  - "Film crew setting up lighting for commercial shoot"');
      console.log('  - "Video editor working on post-production timeline"');
      console.log('  - "Behind the scenes of brand video production"');
      console.log('  - "Professional camera operator filming product video"');
      console.log('  - "Creative team reviewing video footage on set"');
    }

    // Report issues but don't fail the test
    console.log(`\nFound ${issues.length} accessibility issues in this section`);
  });
});
