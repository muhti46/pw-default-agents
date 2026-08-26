import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  protected page: Page;
  readonly baseURL = "https://zincbank.cydeo.io";

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = "") {
    await this.page.goto(`${this.baseURL}${path}`);
  }

  async verifyUrl(expectedUrl: string) {
    await expect(this.page).toHaveURL(expectedUrl, { timeout: 15000 });
  }

  async verifyUrlPattern(pattern: RegExp) {
    await expect(this.page).toHaveURL(pattern, { timeout: 15000 });
  }

  async verifyVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async verifyHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async verifyText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }
}
