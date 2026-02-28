import { test, expect } from "@playwright/test";

const BREAKPOINTS = [
  { name: "small-mobile", width: 375, height: 812 },
  { name: "mobile", width: 480, height: 854 },
  { name: "large-mobile", width: 640, height: 960 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop-sm", width: 960, height: 800 },
  { name: "desktop", width: 1200, height: 900 },
  { name: "desktop-lg", width: 1440, height: 900 },
];

for (const bp of BREAKPOINTS) {
  test.describe(`Responsive @ ${bp.name} (${bp.width}px)`, () => {
    test.use({ viewport: { width: bp.width, height: bp.height } });

    test("no horizontal overflow", async ({ page }) => {
      await page.goto("/");
      await page.waitForTimeout(500);

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth;
      });

      expect(hasOverflow).toBe(false);
    });

    test("all main sections are present", async ({ page }) => {
      await page.goto("/");

      const sections = [
        "hero-section",
        "about-section",
        "flavors-section",
        "portfolio-section",
        "reviews-section",
        "order-section",
        "contact-section",
      ];

      for (const section of sections) {
        await expect(page.getByTestId(section)).toBeAttached();
      }
    });

    if (bp.width < 960) {
      test("navigation shows hamburger menu", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByTestId("mobile-menu-toggle")).toBeVisible();
      });

      test("desktop nav is hidden", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByTestId("desktop-nav")).not.toBeVisible();
      });
    }

    if (bp.width >= 960) {
      test("navigation shows desktop links", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByTestId("desktop-nav")).toBeVisible();
      });

      test("hamburger is hidden", async ({ page }) => {
        await page.goto("/");
        await expect(page.getByTestId("mobile-menu-toggle")).not.toBeVisible();
      });
    }

    test("touch targets are adequate size on mobile", async ({ page }) => {
      if (bp.width >= 960) {
        test.skip();
        return;
      }

      await page.goto("/");

      // Check CTA button size
      const ctaButtons = page.locator("button, a[href]").filter({ hasText: /Заказать|Далее|Отправить/ });
      const count = await ctaButtons.count();

      for (let i = 0; i < Math.min(count, 3); i++) {
        const box = await ctaButtons.nth(i).boundingBox();
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(40);
        }
      }
    });
  });
}
