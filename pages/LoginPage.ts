import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get emailInput(): Locator {
    return this.page.getByTestId("login-email-input");
  }

  get passwordInput(): Locator {
    return this.page.getByTestId("login-password-input");
  }

  get submitButton(): Locator {
    return this.page.getByTestId("login-submit");
  }

  get alert(): Locator {
    return this.page.getByRole("alert");
  }

  async goto() {
    await this.navigate("/login");
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
