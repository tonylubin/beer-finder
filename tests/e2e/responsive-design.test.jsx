// @ts-check
import { test, expect } from "@playwright/test";

test.describe("testing responsive viewports", () => {

  test.beforeEach(async ({ page, isMobile }) => {
    // skipping tests - only for mobile browser
    if(!isMobile) test.skip();
    await page.goto("/");
  });

  test("should display options component", async ({ page }) => {
    await expect(page.getByLabel("extra options")).toBeVisible();
  });

  test("on click should reveal filter/search options", async ({ page }) => {
    await page.getByLabel("extra options").click();
    await expect(page.getByRole("button", { name: "search catalogue" })).toBeVisible();
  });

  test("on click should hide filter/search options", async ({ page }) => {
    const btn = page.getByLabel("extra options");
    const searchBox = page.getByRole("button", { name: "search catalogue" });
    await btn.click();
    await expect(searchBox).toBeVisible();
    await btn.click();
    await expect(searchBox).not.toBeInViewport();
  });

});
