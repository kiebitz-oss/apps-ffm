import { expect, test } from "@playwright/test";

test("should navigate to the faq page", async ({ page }) => {
  await page.goto("/");
  await page.click("text=Fragen & Antworten");
  await expect(page).toHaveURL("/faq/");
  await expect(page.locator("h1")).toContainText("Fragen & Antworten");
});
