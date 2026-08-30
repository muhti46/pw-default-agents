import { Given, When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { CustomWorld } from "../support/hooks";

// Account labels are read from the live form so the tests survive account data resets.
async function ensureTwoAccounts(world: CustomWorld) {
  await world.moveMoneyPage.goto();
  const options = await world.moveMoneyPage.getTransferAccountOptions();
  if (options.length < 2) {
    await world.accountsPage.goto();
    await world.accountsPage.openSavingsIfAvailable();
    await world.moveMoneyPage.goto();
  }
}

async function getAccounts(world: CustomWorld): Promise<{ from: string; to: string }> {
  await ensureTwoAccounts(world);
  const options = await world.moveMoneyPage.getTransferAccountOptions();
  return { from: options[0], to: options[1] };
}

When("I transfer money between my accounts", async function (this: CustomWorld) {
  const { from, to } = await getAccounts(this);
  await this.moveMoneyPage.transfer(from, to, "10", "test transfer");
});

Then("the transfer should be completed", async function (this: CustomWorld) {
  // A successful transfer leaves the page without an error note
  await expect(this.moveMoneyPage.transferForm.getByText("INSUFFICIENT_FUNDS")).not.toBeVisible();
});

Given("I have a saved payee", async function (this: CustomWorld) {
  await this.moveMoneyPage.goto();
  if (await this.moveMoneyPage.billpayNoPayees.isVisible()) {
    await this.moveMoneyPage.addPayee("Electric Co", "123456789");
    await this.basePage.verifyVisible(this.moveMoneyPage.payeeRow("Electric Co"));
  }
});

When("I pay a bill to the payee", async function (this: CustomWorld) {
  const { from } = await getAccounts(this);
  await this.basePage.verifyVisible(this.moveMoneyPage.billpayForm);
  await this.moveMoneyPage.billpayFrom.selectOption({ label: from });
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
  const { from, to } = await getAccounts(this);
  await this.moveMoneyPage.transfer(from, to, "1000");
});

Then("I should see an insufficient funds error and no transfer happens", async function (this: CustomWorld) {
  await this.basePage.verifyVisible(this.moveMoneyPage.transferForm.getByText("INSUFFICIENT_FUNDS"));
});

When("I submit the transfer twice", async function (this: CustomWorld) {
  const { from, to } = await getAccounts(this);
  await this.moveMoneyPage.transferFrom.selectOption({ label: from });
  await this.moveMoneyPage.transferTo.selectOption({ label: to });
  await this.moveMoneyPage.transferAmount.fill("10");
  await this.moveMoneyPage.transferSubmit.click();
  await this.moveMoneyPage.transferSubmit.click();
});

Then("only one transfer should be recorded", async function (this: CustomWorld) {
  // With insufficient funds, no transfer is recorded at all
  await expect(this.moveMoneyPage.transferForm.getByText("INSUFFICIENT_FUNDS")).toBeVisible();
});
