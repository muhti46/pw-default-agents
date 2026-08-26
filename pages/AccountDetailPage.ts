import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class AccountDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get backLink(): Locator {
    return this.page.getByTestId("account-detail-back");
  }

  get balance(): Locator {
    return this.page.getByTestId("account-detail-balance");
  }

  get number(): Locator {
    return this.page.getByTestId("account-detail-number");
  }

  get routing(): Locator {
    return this.page.getByTestId("account-detail-routing");
  }

  async goto(accountId: string) {
    await this.navigate(`/accounts/${accountId}`);
  }
}
