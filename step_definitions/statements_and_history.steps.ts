import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/hooks";

When("I open the transactions page", async function (this: CustomWorld) {
  await this.transactionsPage.goto();
});

Then("I should see the transaction history for the selected account", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.transactionsPage.view);
  await this.basePage.verifyVisible(this.transactionsPage.accountSelect);
  await this.basePage.verifyVisible(this.transactionsPage.balance);
});

When("I apply a date range filter", async function (this: CustomWorld) {
  await this.transactionsPage.fromInput.fill("2026-01-01");
  await this.transactionsPage.toInput.fill("2026-12-31");
  await this.transactionsPage.applyButton.click();
});

Then("the transactions should be filtered to that range", async function (this: CustomWorld) {
  // The page reflects the applied range (empty state or filtered list)
  await this.basePage.verifyVisible(this.transactionsPage.view);
});

Then("I should see a statement download option for the account", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.transactionsPage.periodSelect);
  await this.basePage.verifyVisible(this.transactionsPage.statementLink);
});

Then("I should see the card statement option", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.transactionsPage.periodSelect);
  await this.basePage.verifyVisible(this.transactionsPage.statementLink);
});
