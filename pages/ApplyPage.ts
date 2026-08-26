import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class ApplyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get nextButton(): Locator {
    return this.page.getByTestId("apply-next");
  }

  get firstNameInput(): Locator {
    return this.page.getByTestId("apply-firstname-input");
  }

  get lastNameInput(): Locator {
    return this.page.getByTestId("apply-lastname-input");
  }

  get emailInput(): Locator {
    return this.page.getByTestId("apply-email-input");
  }

  get phoneInput(): Locator {
    return this.page.getByTestId("apply-phone-input");
  }

  get dobInput(): Locator {
    return this.page.getByTestId("apply-dob-input");
  }

  get ssnInput(): Locator {
    return this.page.getByTestId("apply-ssn-input");
  }

  get employmentSelect(): Locator {
    return this.page.getByTestId("apply-employment-select");
  }

  get addressInput(): Locator {
    return this.page.getByTestId("apply-addressline-input");
  }

  get cityInput(): Locator {
    return this.page.getByTestId("apply-city-input");
  }

  get stateSelect(): Locator {
    return this.page.getByTestId("apply-state-select");
  }

  get zipInput(): Locator {
    return this.page.getByTestId("apply-zip-input");
  }

  get passwordInput(): Locator {
    return this.page.getByTestId("apply-password-input");
  }

  get confirmInput(): Locator {
    return this.page.getByTestId("apply-confirm-input");
  }

  get termsCheckbox(): Locator {
    return this.page.getByTestId("apply-terms-checkbox");
  }

  get submitButton(): Locator {
    return this.page.getByTestId("apply-submit");
  }

  get welcomeHeading(): Locator {
    return this.page.getByRole("heading", { name: /Welcome to ZincBank/ });
  }

  get approvedText(): Locator {
    return this.page.getByText(/approved/);
  }

  async goto() {
    await this.navigate("/apply");
  }

  async openAccount(
    email: string,
    password: string,
    firstName = "Test",
    lastName = "User"
  ) {
    await this.goto();
    // Step 1: Choose accounts (Checking always included)
    await this.nextButton.click();

    // Step 2: Personal details
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.phoneInput.fill("5551234567");
    await this.dobInput.fill("1990-01-01");
    await this.nextButton.click();

    // Step 3: SSN + employment
    await this.ssnInput.fill("123456789");
    await this.employmentSelect.selectOption({ index: 1 });
    await this.nextButton.click();

    // Step 4: Address
    await this.addressInput.fill("123 Main St");
    await this.cityInput.fill("Springfield");
    await this.stateSelect.selectOption({ index: 1 });
    await this.zipInput.fill("90210");
    await this.nextButton.click();

    // Step 5: Password
    await this.passwordInput.fill(password);
    await this.confirmInput.fill(password);
    await this.nextButton.click();

    // Step 6: Review + terms + submit
    await this.termsCheckbox.check();
    await this.submitButton.click();
  }
}
