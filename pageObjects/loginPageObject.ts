import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginField: Locator;
  readonly passwordField: Locator;
  readonly buttonLogin: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginField = page.locator("//input[@type='email']");
    this.passwordField = page.locator("//input[@type='password']");
    this.buttonLogin = page.locator("//button[@type='submit']");
  }

  async login(username: string, password: string) {
    await this.loginField.fill(username);
    await this.passwordField.fill(password);
    await this.buttonLogin.click();
  }

  async checkTypePasswordField(attribute: string, expectedFieldType: string) {
    await expect(this.passwordField).toHaveAttribute(attribute, expectedFieldType);
  }
}