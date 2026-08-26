import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

When("I view my accounts", async function (this: CustomWorld) {
  await this.accountsPage.goto();
});

Then("I should see my checking account with a balance", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.accountsPage.list);
  await this.basePage.verifyText(this.accountsPage.list, "Checking");
  await this.basePage.verifyVisible(this.accountsPage.accountCards().first());
});

When("I open the first account", async function (this: CustomWorld) {
  await this.accountsPage.goto();
  await this.accountsPage.openFirstAccount();
});

Then("I should see the account payment details", async function (this: CustomWorld) {
  await this.basePage.verifyUrlPattern(/\/accounts\/[0-9a-f-]{36}/);
  await this.basePage.verifyVisible(this.accountDetailPage.number);
  await this.basePage.verifyVisible(this.accountDetailPage.routing);
  await this.basePage.verifyVisible(this.accountDetailPage.balance);
});

When("I open a savings account", async function (this: CustomWorld) {
  await this.accountsPage.goto();
  await this.accountsPage.openSavingsIfAvailable();
});

Then("a savings account should be listed", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.accountsPage.list.getByText("Savings").first());
});

When("I navigate to a non-existent account", async function (this: CustomWorld) {
  await this.accountDetailPage.goto("00000000-0000-0000-0000-000000000000");
});

Then("I should see a 404 not found page", async function (this: CustomWorld) {
  await this.basePage.verifyUrlPattern(/00000000-0000-0000-0000-000000000000/);
  await expect(this.page.getByRole("heading", { name: "404" })).toBeVisible();
});
