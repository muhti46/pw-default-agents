import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class CardsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get view(): Locator {
    return this.page.getByTestId("cards-view");
  }

  // Apply form (shown when the customer has no card)
  get applyForm(): Locator {
    return this.page.getByTestId("cards-apply-form");
  }

  get applyIncome(): Locator {
    return this.page.getByTestId("cards-apply-income-input");
  }

  get applyEmployment(): Locator {
    return this.page.getByTestId("cards-apply-employment-select");
  }

  get applyHousing(): Locator {
    return this.page.getByTestId("cards-apply-housing-input");
  }

  get applyDebt(): Locator {
    return this.page.getByTestId("cards-apply-debt-input");
  }

  get applySubmit(): Locator {
    return this.page.getByTestId("cards-apply-submit");
  }

  get applyDecisionApproved(): Locator {
    return this.page.getByTestId("apply-decision-approved");
  }

  // Card summary (shown when the customer has a card)
  get cardSummary(): Locator {
    return this.page.getByTestId("cards-card-summary");
  }

  get cardBalance(): Locator {
    return this.page.getByTestId("cards-card-balance");
  }

  get cardLimit(): Locator {
    return this.page.getByTestId("cards-card-limit");
  }

  get cardAvailable(): Locator {
    return this.page.getByTestId("cards-card-available");
  }

  get cardApr(): Locator {
    return this.page.getByTestId("cards-card-apr");
  }

  get statementDownload(): Locator {
    return this.page.getByTestId("cards-statement-download");
  }

  // Pay form
  get payForm(): Locator {
    return this.page.getByTestId("cards-pay-form");
  }

  get payFromSelect(): Locator {
    return this.page.getByTestId("cards-pay-from-select");
  }

  get payAmountInput(): Locator {
    return this.page.getByTestId("cards-pay-amount-input");
  }

  get paySubmit(): Locator {
    return this.page.getByTestId("cards-pay-submit");
  }

  async goto() {
    await this.navigate("/cards");
  }

  async applyForCard(income: string, employment: string, housing: string, debt: string) {
    await this.applyIncome.fill(income);
    await this.applyEmployment.selectOption({ label: employment });
    await this.applyHousing.fill(housing);
    await this.applyDebt.fill(debt);
    await this.applySubmit.click();
  }
}
