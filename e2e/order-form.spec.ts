import { test, expect } from "@playwright/test";

test.describe("Order Form (Cake Constructor)", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.locator("#order").scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
  });

  test("step 1: weight and filling selects are present", async ({ page }) => {
    const weightSelect = page.getByTestId("select-weight");
    const fillingSelect = page.getByTestId("select-filling");

    await expect(weightSelect).toBeVisible();
    await expect(fillingSelect).toBeVisible();
  });

  test("step 1: next button disabled until selections made", async ({
    page,
  }) => {
    const nextBtn = page.getByTestId("next-step-1");
    await expect(nextBtn).toBeDisabled();

    // Select weight
    await page.getByTestId("select-weight").selectOption({ index: 1 });
    await expect(nextBtn).toBeDisabled();

    // Select filling
    await page.getByTestId("select-filling").selectOption({ index: 1 });
    await expect(nextBtn).toBeEnabled();
  });

  test("navigate through all 3 steps", async ({ page }) => {
    // Step 1
    await page.getByTestId("select-weight").selectOption({ index: 1 });
    await page.getByTestId("select-filling").selectOption({ index: 1 });
    await page.getByTestId("next-step-1").click();
    await page.waitForTimeout(400);

    // Step 2 should be visible
    const step2 = page.getByTestId("order-step-2");
    await expect(step2).toBeVisible();

    // Select coating
    await page.getByTestId("select-coating").selectOption({ index: 1 });
    await page.getByTestId("next-step-2").click();
    await page.waitForTimeout(400);

    // Step 3 should be visible
    const step3 = page.getByTestId("order-step-3");
    await expect(step3).toBeVisible();
  });

  test("step 3: submit disabled without required fields", async ({ page }) => {
    // Navigate to step 3
    await page.getByTestId("select-weight").selectOption({ index: 1 });
    await page.getByTestId("select-filling").selectOption({ index: 1 });
    await page.getByTestId("next-step-1").click();
    await page.waitForTimeout(400);

    await page.getByTestId("select-coating").selectOption({ index: 1 });
    await page.getByTestId("next-step-2").click();
    await page.waitForTimeout(400);

    const submitBtn = page.getByTestId("submit-order");
    await expect(submitBtn).toBeDisabled();

    // Fill name
    await page.getByTestId("input-name").fill("Тест");
    await expect(submitBtn).toBeDisabled();

    // Fill phone
    await page.getByTestId("input-phone").fill("+1 786 200 1234");
    await expect(submitBtn).toBeEnabled();
  });

  test("full form submission shows success message", async ({ page }) => {
    // Step 1
    await page.getByTestId("select-weight").selectOption({ index: 1 });
    await page.getByTestId("select-filling").selectOption({ index: 1 });
    await page.getByTestId("next-step-1").click();
    await page.waitForTimeout(400);

    // Step 2
    await page.getByTestId("select-coating").selectOption({ index: 1 });
    await page.getByTestId("next-step-2").click();
    await page.waitForTimeout(400);

    // Step 3
    await page.getByTestId("input-name").fill("Анна");
    await page.getByTestId("input-phone").fill("+1 786 200 1234");
    await page.getByTestId("input-comment").fill("Тестовый комментарий");
    await page.getByTestId("submit-order").click();
    await page.waitForTimeout(500);

    // Success message
    const success = page.getByTestId("order-success");
    await expect(success).toBeVisible();
    await expect(success).toContainText("Анна");
  });

  test("can navigate back between steps", async ({ page }) => {
    // Go to step 2
    await page.getByTestId("select-weight").selectOption({ index: 1 });
    await page.getByTestId("select-filling").selectOption({ index: 1 });
    await page.getByTestId("next-step-1").click();
    await page.waitForTimeout(400);

    await expect(page.getByTestId("order-step-2")).toBeVisible();

    // Go back to step 1
    await page.getByText("Назад").click();
    await page.waitForTimeout(400);

    await expect(page.getByTestId("order-step-1")).toBeVisible();
  });

  test("decoration checkboxes can be toggled", async ({ page }) => {
    // Navigate to step 2
    await page.getByTestId("select-weight").selectOption({ index: 1 });
    await page.getByTestId("select-filling").selectOption({ index: 1 });
    await page.getByTestId("next-step-1").click();
    await page.waitForTimeout(400);

    // Find and click a decoration checkbox label
    const decorLabel = page.getByText("Надпись");
    await decorLabel.click();

    // The checkbox should be checked
    const checkbox = page.getByTestId("checkbox-Надпись");
    await expect(checkbox).toBeChecked();

    // Click again to uncheck
    await decorLabel.click();
    await expect(checkbox).not.toBeChecked();
  });
});
