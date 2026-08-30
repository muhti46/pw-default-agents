import { Given, When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/hooks";

Given("I have a credit card", async function (this: CustomWorld) {
  await this.cardsPage.goto();
  if (await this.cardsPage.applyForm.isVisible()) {
    await this.cardsPage.applyForCard("75000", "Employed", "1500", "0");
    await this.basePage.verifyVisible(this.cardsPage.cardSummary);
  }
  // End on the dashboard so callers can assert dashboard state (e.g. C3)
  await this.dashboardPage.goto();
});

When("I open the cards page", async function (this: CustomWorld) {
  await this.cardsPage.goto();
});

Then("I should see my card with limit, available credit and APR", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.cardsPage.cardSummary);
  await this.basePage.verifyVisible(this.cardsPage.cardLimit);
  await this.basePage.verifyVisible(this.cardsPage.cardAvailable);
  await this.basePage.verifyVisible(this.cardsPage.cardApr);
});

Then("I should see the pay card form", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.cardsPage.payForm);
  await this.basePage.verifyVisible(this.cardsPage.payFromSelect);
  await this.basePage.verifyVisible(this.cardsPage.payAmountInput);
});

Then("I should see a statement download link", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.cardsPage.statementDownload);
});

Then("I should not see a card application form", async function (this: CustomWorld) {
  await this.basePage.verifyHidden(this.cardsPage.applyForm);
});
