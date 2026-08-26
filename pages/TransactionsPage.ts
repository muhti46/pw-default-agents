import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class TransactionsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get view(): Locator {
    return this.page.getByTestId("transactions-view");
  }

  get accountSelect(): Locator {
    return this.page.getByTestId("transactions-account");
  }

  get balance(): Locator {
    return this.page.getByTestId("transactions-balance");
  }

  get fromInput(): Locator {
    return this.page.getByTestId("transactions-from");
  }

  get toInput(): Locator {
    return this.page.getByTestId("transactions-to");
  }

  get applyButton(): Locator {
    return this.page.getByTestId("transactions-apply");
  }

  get periodSelect(): Locator {
    return this.page.getByTestId("transactions-period");
  }

  get statementLink(): Locator {
    return this.page.getByTestId("transactions-statement");
  }

  get emptyMessage(): Locator {
    return this.page.getByTestId("transactions-empty");
  }

  get total(): Locator {
    return this.page.getByTestId("transactions-total");
  }

  get prevButton(): Locator {
    return this.page.getByTestId("transactions-prev");
  }

  get nextButton(): Locator {
    return this.page.getByTestId("transactions-next");
  }

  async goto() {
    await this.navigate("/transactions");
  }
}
