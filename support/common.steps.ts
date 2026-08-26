import { Given } from "@cucumber/cucumber";
import { CustomWorld } from "./hooks";

// Credentials können über Umgebungsvariablen (z. B. aus Jenkins) überschrieben werden.
// Fallback auf die lokalen Testdaten, wenn keine Variablen gesetzt sind.
const EMAIL = process.env.ZINCBANK_EMAIL || "e2e-moduleb@example.com";
const PASSWORD = process.env.ZINCBANK_PASSWORD || "TestPass123!";

Given("I am signed in to ZincBank", async function (this: CustomWorld) {
  await this.loginPage.goto();
  await this.loginPage.login(EMAIL, PASSWORD);
  await this.basePage.verifyUrlPattern(/\/dashboard/);
});
