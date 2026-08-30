import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

When("I open the profile page", async function (this: CustomWorld) {
  await this.profilePage.goto();
});

Then("I should see my personal details", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.profilePage.view);
  await this.basePage.verifyVisible(this.profilePage.firstNameInput);
  await this.basePage.verifyVisible(this.profilePage.lastNameInput);
  await this.basePage.verifyVisible(this.profilePage.phoneInput);
  await this.basePage.verifyVisible(this.profilePage.emailInput);
});

When("I update my phone number", async function (this: CustomWorld) {
  await this.profilePage.phoneInput.fill("5559998888");
  await this.profilePage.saveButton.click();
});

Then("my phone number should be updated", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.profilePage.view);
  await expect(this.profilePage.phoneInput).toHaveValue("5559998888");
});

Then("the email field should be disabled", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.profilePage.emailInput);
  await this.profilePage.emailInput.isDisabled();
});

Then("I should see the change password form", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.profilePage.passwordForm);
  await this.basePage.verifyVisible(this.profilePage.currentPasswordInput);
  await this.basePage.verifyVisible(this.profilePage.newPasswordInput);
});

Given("I am signed out", async function (this: CustomWorld) {
  // Sign in first, then sign out to clear the session
  await this.loginPage.goto();
  await this.loginPage.login("e2e-moduleb2@example.com", "TestPass123!");
  await this.basePage.verifyUrlPattern(/\/dashboard/);
  await this.dashboardPage.signOut();
  // Confirm we are back on the login page (session cleared)
  await this.basePage.verifyUrlPattern(/\/login/);
});

When("I try to access the dashboard", async function (this: CustomWorld) {
  await this.dashboardPage.goto();
});

Then("I should be redirected to the login page", async function (this: CustomWorld) {
  await this.basePage.verifyUrlPattern(/\/login/);
});
