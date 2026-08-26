import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

const createdPassword = "TestPass123!";

Given("I am on the ZincBank sign-up page", async function (this: CustomWorld) {
  await this.applyPage.goto();
});

When("I open an account with a unique email and password", async function (this: CustomWorld) {
  this.createdEmail = `e2e-gettingstarted-${Date.now()}@example.com`;
  await this.applyPage.openAccount(this.createdEmail, createdPassword);
});

Then("I should see the account approval message", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.applyPage.welcomeHeading);
  await this.basePage.verifyVisible(this.applyPage.approvedText);
});

Given("I have an existing ZincBank account", async function (this: CustomWorld) {
  // Each scenario creates its own account so it is independent in parallel mode
  this.createdEmail = `e2e-gettingstarted-${Date.now()}@example.com`;
  await this.applyPage.openAccount(this.createdEmail, createdPassword);
});

When("I sign in with the correct credentials", async function (this: CustomWorld) {
  await this.loginPage.goto();
  await this.loginPage.login(this.createdEmail, createdPassword);
});

Then("I should be taken to the dashboard", async function (this: CustomWorld) {
  await this.basePage.verifyUrlPattern(/\/dashboard/);
});

When("I sign in with an incorrect password", async function (this: CustomWorld) {
  await this.loginPage.goto();
  await this.loginPage.login(this.createdEmail, "WrongPass123!");
});

Then("I should see a sign-in error and remain on the login page", async function (this: CustomWorld) {
  await this.basePage.verifyUrlPattern(/\/login/);
  await this.basePage.verifyVisible(this.loginPage.alert);
});

When("I try to open another account with the same email", async function (this: CustomWorld) {
  await this.applyPage.openAccount(this.createdEmail, createdPassword);
});

Then("I should not reach the approval screen", async function (this: CustomWorld) {
  await expect(this.applyPage.welcomeHeading).not.toBeVisible();
});
