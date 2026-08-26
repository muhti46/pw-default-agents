import { When, Then } from "@cucumber/cucumber";
import { CustomWorld } from "../support/hooks";

Then("I should see the dashboard with a welcome message", async function (this: CustomWorld) {
  await this.basePage.verifyUrlPattern(/\/dashboard/);
  await this.basePage.verifyVisible(this.dashboardPage.welcomeHeading);
});

Then("I should see my total deposit balance", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.dashboardPage.totalDeposit);
});

 Then("I should see my credit card on the dashboard", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.dashboardPage.cardSummary);
});

Then("I should see the recent activity section", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.dashboardPage.recentActivity);
});

When("I click the quick transfer shortcut", async function (this: CustomWorld) {
  await this.dashboardPage.quickTransferLink.click();
});

Then("I should be taken to the move money page", async function (this: CustomWorld) {
  await this.basePage.verifyUrlPattern(/\/move-money/);
});
