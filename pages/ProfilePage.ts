import { Page, Locator } from "@playwright/test";
import { BasePage } from "../support/BasePage";

export class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  get view(): Locator {
    return this.page.getByTestId("profile-view");
  }

  // Personal details form
  get form(): Locator {
    return this.page.getByTestId("profile-form");
  }

  get firstNameInput(): Locator {
    return this.page.getByTestId("profile-firstname-input");
  }

  get lastNameInput(): Locator {
    return this.page.getByTestId("profile-lastname-input");
  }

  get phoneInput(): Locator {
    return this.page.getByTestId("profile-phone-input");
  }

  get addressInput(): Locator {
    return this.page.getByTestId("profile-addressline-input");
  }

  get emailInput(): Locator {
    return this.page.getByTestId("profile-email-input");
  }

  get saveButton(): Locator {
    return this.page.getByTestId("profile-save");
  }

  // Password form
  get passwordForm(): Locator {
    return this.page.getByTestId("profile-password-form");
  }

  get currentPasswordInput(): Locator {
    return this.page.getByTestId("profile-currentpassword-input");
  }

  get newPasswordInput(): Locator {
    return this.page.getByTestId("profile-newpassword-input");
  }

  get changePasswordSubmit(): Locator {
    return this.page.getByTestId("profile-changepassword-submit");
  }

  async goto() {
    await this.navigate("/profile");
  }
}
