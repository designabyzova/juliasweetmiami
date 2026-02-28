import { test, expect } from "@playwright/test";

test.describe("Navigation & Scroll", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("clicking nav links scrolls to correct section", async ({ page }) => {
    // Only test desktop nav (visible on desktop)
    const isMobile = (page.viewportSize()?.width ?? 0) < 960;

    if (!isMobile) {
      const desktopNav = page.getByTestId("desktop-nav");
      await expect(desktopNav).toBeVisible();

      // Click "Начинки" (Flavors)
      await desktopNav.getByText("Начинки").click();
      await page.waitForTimeout(1000);

      // Flavors section should be near the top of the viewport
      const flavorsTop = await page
        .locator("#flavors")
        .evaluate((el) => el.getBoundingClientRect().top);
      expect(flavorsTop).toBeLessThan(200);
    }
  });

  test("logo click scrolls to top", async ({ page }) => {
    // Scroll down first
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.waitForTimeout(500);

    // Click logo
    await page.getByRole("button", { name: "Juliia Sweet" }).first().click();
    await page.waitForTimeout(1000);

    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeLessThan(200);
  });
});

test.describe("Mobile Menu", () => {
  test("hamburger menu opens and closes on mobile", async ({ page }) => {
    const isMobile = (page.viewportSize()?.width ?? 0) < 960;
    if (!isMobile) {
      test.skip();
      return;
    }

    await page.goto("/");

    const toggle = page.getByTestId("mobile-menu-toggle");
    await expect(toggle).toBeVisible();

    // Open menu
    await toggle.click();
    await page.waitForTimeout(300);
    const mobileMenu = page.getByTestId("mobile-menu");
    await expect(mobileMenu).toBeVisible();

    // Click a nav link to close
    await mobileMenu.getByText("Начинки").click();
    await page.waitForTimeout(500);

    // Menu should be gone
    await expect(mobileMenu).not.toBeVisible();
  });

  test("mobile menu overlay closes menu on click", async ({ page }) => {
    const isMobile = (page.viewportSize()?.width ?? 0) < 960;
    if (!isMobile) {
      test.skip();
      return;
    }

    await page.goto("/");

    await page.getByTestId("mobile-menu-toggle").click();
    await page.waitForTimeout(300);

    const overlay = page.getByTestId("mobile-menu-overlay");
    await expect(overlay).toBeVisible();

    await overlay.click({ position: { x: 10, y: 10 } });
    await page.waitForTimeout(500);

    await expect(page.getByTestId("mobile-menu")).not.toBeVisible();
  });
});
