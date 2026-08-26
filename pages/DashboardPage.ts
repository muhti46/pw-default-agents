import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get accountsLink(): Locator {
    return this.page.getByTestId("nav-accounts");
  }

  get welcomeHeading(): Locator {
    return this.page.getByTestId("dashboard-welcome");
  }

  get quickTransferLink(): Locator {
    return this.page.getByTestId("dashboard-quick-transfer");
  }

  get totalDeposit(): Locator {
    return this.page.getByTestId("dashboard-total-deposit");
  }

  get cardSummary(): Locator {
    return this.page.getByTestId("dashboard-card-summary");
  }

  get recentActivity(): Locator {
    return this.page.getByTestId("dashboard-recent-activity");
  }

  get recentEmpty(): Locator {
    return this.page.getByTestId("dashboard-recent-empty");
  }

  get signOutButton(): Locator {
    return this.page.getByTestId("nav-signout");
  }

  async signOut() {
    await this.signOutButton.click();
  }

  accountCards(): Locator {
    return this.page.locator('[data-testid^="dashboard-account-card-"]');
  }

  async goto() {
    await this.navigate("/dashboard");
  }
}
