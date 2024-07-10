// @ts-check
import { test, expect } from "@playwright/test";

test.describe("filtering and search bar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Beer Finder" })
    ).toBeVisible();
  });

  test("on click updates search params", async ({ page, isMobile }) => {
    if (isMobile) await page.getByLabel("extra options").click();

    await page.getByRole("textbox").fill("lager");
    await page.getByRole("button", { name: "search catalogue" }).click();
    await expect(page).toHaveURL(/\?name=lager/);
  });

  test("removes/adds checkbox option to/from query params", async ({
    page,
    isMobile,
  }) => {
    let checkbox;
    if (isMobile) {
      await page.getByLabel("extra options").click();
      checkbox = page.locator("section").getByTestId("abv");
    }
    if (!isMobile) checkbox = page.getByRole("checkbox", { name: "abv" });
    await checkbox.setChecked(true);
    await expect(page).toHaveURL(/\?abv_lt=4/);
    await checkbox.setChecked(false);
    await expect(page).not.toHaveURL(/\?abv_lt=4/);
  });

  test("applying/removing select option to/from query params", async ({
    page,
    isMobile,
  }) => {
    if (isMobile) await page.getByLabel("extra options").click();

    const option = page.getByRole("combobox");
    await option.selectOption({ value: "spicy" });
    await expect(page).toHaveURL(/\?food_pairing=spicy/);
    await option.selectOption({ value: "" });
    await expect(page).not.toHaveURL(/\?food_pairing=spicy/);
  });

  test("adding/removing multiple filters to url query params", async ({
    page,
    isMobile,
  }) => {
    let abvCheckbox;
    let classicCheckbox;
    if (isMobile) {
      await page.getByLabel("extra options").click();
      abvCheckbox = page.locator("section").getByTestId("abv");
      classicCheckbox = page.locator("section").getByTestId("classic");
    }
    if (!isMobile) {
      abvCheckbox = page.getByRole("checkbox", { name: "abv" });
      classicCheckbox = page.getByRole("checkbox", { name: "classic" });
    }
    await abvCheckbox.setChecked(true);
    await expect(page).toHaveURL(/\?abv_lt=4/);
    await classicCheckbox.setChecked(true);
    await expect(page).toHaveURL(/\?abv_lt=4&brewed_before=2010-10-01/);
    await abvCheckbox.setChecked(false);
    await expect(page).toHaveURL(/\?brewed_before=2010-10-01/);
  });
});
