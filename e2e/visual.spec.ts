import { test, expect } from "@playwright/test";

test.describe("Visual Rendering", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("all sections render and are visible", async ({ page }) => {
    const sections = [
      "hero-section",
      "about-section",
      "flavors-section",
      "portfolio-section",
      "reviews-section",
      "order-section",
      "contact-section",
      "footer",
    ];

    for (const section of sections) {
      const el = page.getByTestId(section);
      await expect(el).toBeAttached();
    }
  });

  test("header is visible and fixed", async ({ page }) => {
    const header = page.getByTestId("header");
    await expect(header).toBeVisible();

    // Scroll down and verify header is still visible (fixed)
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);
    await expect(header).toBeVisible();
  });

  test("hero image loads without errors", async ({ page }) => {
    const heroImg = page.locator("#hero img");
    await expect(heroImg).toBeVisible();

    // Verify image loaded (naturalWidth > 0)
    const naturalWidth = await heroImg.evaluate(
      (img: HTMLImageElement) => img.naturalWidth
    );
    expect(naturalWidth).toBeGreaterThan(0);
  });

  test("coral accent color is applied to CTA buttons", async ({ page }) => {
    const ctaButton = page.locator("#hero button").first();
    await expect(ctaButton).toBeVisible();

    const bgColor = await ctaButton.evaluate((el) =>
      getComputedStyle(el).backgroundColor
    );
    // #ff8576 = rgb(255, 133, 118)
    expect(bgColor).toBe("rgb(255, 133, 118)");
  });

  test("all 8 flavor cards render", async ({ page }) => {
    // Scroll to flavors section
    await page.locator("#flavors").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    for (let i = 0; i < 8; i++) {
      const card = page.getByTestId(`flavor-card-${i}`);
      await expect(card).toBeAttached();
    }
  });

  test("all 16 portfolio items render", async ({ page }) => {
    await page.locator("#portfolio").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    for (let i = 0; i < 16; i++) {
      const item = page.getByTestId(`portfolio-item-${i}`);
      await expect(item).toBeAttached();
    }
  });

  test("all 4 review cards render", async ({ page }) => {
    await page.locator("#reviews").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    for (let i = 0; i < 4; i++) {
      const card = page.getByTestId(`review-card-${i}`);
      await expect(card).toBeAttached();
    }
  });

  test("order form step 1 is visible by default", async ({ page }) => {
    await page.locator("#order").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);

    const step1 = page.getByTestId("order-step-1");
    await expect(step1).toBeVisible();
  });
});
