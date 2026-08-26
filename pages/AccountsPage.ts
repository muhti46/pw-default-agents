import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class AccountsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get list(): Locator {
    return this.page.getByTestId("accounts-list");
  }

  get openSavingsButton(): Locator {
    return this.page.getByTestId("accounts-open-savings");
  }

  accountCards(): Locator {
    return this.page.locator('[data-testid^="accounts-card-"]');
  }

  async goto() {
    await this.navigate("/accounts");
  }

  async openFirstAccount() {
    await this.accountCards().first().click();
  }

  async openSavingsIfAvailable() {
    if (await this.openSavingsButton.isVisible()) {
      await this.openSavingsButton.click();
    }
  }
}
