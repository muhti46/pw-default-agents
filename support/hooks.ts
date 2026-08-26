import { Before, After, setWorldConstructor, World, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext, Page } from "playwright";
import { BasePage } from "./BasePage";
import { LoginPage } from "../pages/LoginPage";
import { ApplyPage } from "../pages/ApplyPage";
import { DashboardPage } from "../pages/DashboardPage";
import { AccountsPage } from "../pages/AccountsPage";
import { AccountDetailPage } from "../pages/AccountDetailPage";
import { MoveMoneyPage } from "../pages/MoveMoneyPage";
import { TransactionsPage } from "../pages/TransactionsPage";
import { CardsPage } from "../pages/CardsPage";
import { ProfilePage } from "../pages/ProfilePage";

setDefaultTimeout(30000);

export class CustomWorld extends World {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  basePage!: BasePage;
  loginPage!: LoginPage;
  applyPage!: ApplyPage;
  dashboardPage!: DashboardPage;
  accountsPage!: AccountsPage;
  accountDetailPage!: AccountDetailPage;
  moveMoneyPage!: MoveMoneyPage;
  transactionsPage!: TransactionsPage;
  cardsPage!: CardsPage;
  profilePage!: ProfilePage;
  createdEmail!: string;
}

setWorldConstructor(CustomWorld);

Before(async function () {
  this.browser = await chromium.launch({ headless: process.env.HEADED !== "true" });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
  this.basePage = new BasePage(this.page);
  this.loginPage = new LoginPage(this.page);
  this.applyPage = new ApplyPage(this.page);
  this.dashboardPage = new DashboardPage(this.page);
  this.accountsPage = new AccountsPage(this.page);
  this.accountDetailPage = new AccountDetailPage(this.page);
  this.moveMoneyPage = new MoveMoneyPage(this.page);
  this.transactionsPage = new TransactionsPage(this.page);
  this.cardsPage = new CardsPage(this.page);
  this.profilePage = new ProfilePage(this.page);
});

After(async function () {
  if (this.page) await this.page.close();
  if (this.context) await this.context.close();
  if (this.browser) await this.browser.close();
});
