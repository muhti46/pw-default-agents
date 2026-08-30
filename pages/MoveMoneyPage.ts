import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class MoveMoneyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Transfer between accounts
  get transferForm(): Locator {
    return this.page.getByTestId("transfer-form");
  }

  get transferFrom(): Locator {
    return this.page.getByTestId("transfer-from");
  }

  get transferTo(): Locator {
    return this.page.getByTestId("transfer-to");
  }

  get transferAmount(): Locator {
    return this.page.getByTestId("transfer-amount");
  }

  get transferMemo(): Locator {
    return this.page.getByTestId("transfer-memo");
  }

  get transferSubmit(): Locator {
    return this.page.getByTestId("transfer-submit");
  }

  // Bill pay
  get billpayForm(): Locator {
    return this.page.getByTestId("billpay-form");
  }

  get billpayFrom(): Locator {
    return this.page.getByTestId("billpay-from");
  }

  get billpayPayee(): Locator {
    return this.page.getByTestId("billpay-payee");
  }

  get billpayAmount(): Locator {
    return this.page.getByTestId("billpay-amount");
  }

  get billpaySubmit(): Locator {
    return this.page.getByTestId("billpay-submit");
  }

  get billpayNoPayees(): Locator {
    return this.page.getByTestId("billpay-no-payees");
  }

  // Payee manager
  get payeeManager(): Locator {
    return this.page.getByTestId("payee-manager");
  }

  get payeeAddName(): Locator {
    return this.page.getByTestId("payee-add-name");
  }

  get payeeAddAccount(): Locator {
    return this.page.getByTestId("payee-add-account");
  }

  get payeeAddSubmit(): Locator {
    return this.page.getByTestId("payee-add-submit");
  }

  payeeRow(name: string): Locator {
    return this.page.getByTestId("payee-manager").getByText(name);
  }

  async getTransferAccountOptions(): Promise<string[]> {
    return this.transferFrom.locator("option").allTextContents();
  }

  async goto() {
    await this.navigate("/move-money");
  }

  async transfer(from: string, to: string, amount: string, memo = "") {
    await this.transferFrom.selectOption({ label: from });
    await this.transferTo.selectOption({ label: to });
    await this.transferAmount.fill(amount);
    if (memo) await this.transferMemo.fill(memo);
    await this.transferSubmit.click();
  }

  async addPayee(name: string, account: string) {
    await this.payeeAddName.fill(name);
    await this.payeeAddAccount.fill(account);
    await this.payeeAddSubmit.click();
  }
}
