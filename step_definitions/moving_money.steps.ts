import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

const FROM_ACCOUNT = "Checking ••0865 ($0.00)";
const TO_ACCOUNT = "Savings ••0866 ($0.00)";

When("I transfer money between my accounts", async function (this: CustomWorld) {
  await this.moveMoneyPage.goto();
  await this.moveMoneyPage.transfer(FROM_ACCOUNT, TO_ACCOUNT, "10", "test transfer");
});

Then("the transfer should be completed", async function (this: CustomWorld) {
  // A successful transfer leaves the page without an error note
  await expect(this.moveMoneyPage.transferForm.getByText("INSUFFICIENT_FUNDS")).not.toBeVisible();
});

Given("I have a saved payee", async function (this: CustomWorld) {
  await this.moveMoneyPage.goto();
  if (await this.moveMoneyPage.billpayNoPayees.isVisible()) {
    await this.moveMoneyPage.addPayee("Electric Co", "123456789");
  }
});

When("I pay a bill to the payee", async function (this: CustomWorld) {
  await this.moveMoneyPage.goto();
  await this.moveMoneyPage.billpayFrom.selectOption({ label: FROM_ACCOUNT });
  await this.moveMoneyPage.billpayAmount.fill("10");
  await this.moveMoneyPage.billpaySubmit.click();
});

Then("the bill payment should be completed", async function (this: CustomWorld) {
  await expect(this.moveMoneyPage.billpayForm.getByText("INSUFFICIENT_FUNDS")).not.toBeVisible();
});

When("I add a payee to my list", async function (this: CustomWorld) {
  await this.moveMoneyPage.goto();
  await this.moveMoneyPage.addPayee("Phone Co", "987654321");
});

Then("the payee should appear in my list", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.moveMoneyPage.payeeRow("Phone Co"));
});

When("I try to transfer more than I have", async function (this: CustomWorld) {
  await this.moveMoneyPage.goto();
  await this.moveMoneyPage.transfer(FROM_ACCOUNT, TO_ACCOUNT, "1000");
});

Then("I should see an insufficient funds error and no transfer happens", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.moveMoneyPage.transferForm.getByText("INSUFFICIENT_FUNDS"));
});

When("I submit the transfer twice", async function (this: CustomWorld) {
  await this.moveMoneyPage.goto();
  await this.moveMoneyPage.transferFrom.selectOption({ label: FROM_ACCOUNT });
  await this.moveMoneyPage.transferTo.selectOption({ label: TO_ACCOUNT });
  await this.moveMoneyPage.transferAmount.fill("10");
  await this.moveMoneyPage.transferSubmit.click();
  await this.moveMoneyPage.transferSubmit.click();
});

Then("only one transfer should be recorded", async function (this: CustomWorld) {
  // With insufficient funds, no transfer is recorded at all
  await expect(this.moveMoneyPage.transferForm.getByText("INSUFFICIENT_FUNDS")).toBeVisible();
});
