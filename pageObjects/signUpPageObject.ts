import { type Locator, type Page } from '@playwright/test';

export class SignUpPage {
  readonly page: Page;
  readonly firstNameField: Locator;
  readonly lastNameField: Locator;
  readonly companyNameField: Locator;
  readonly emailField: Locator;
  readonly phoneField: Locator;
  readonly passwordField: Locator;
  readonly signUpButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameField = page.locator('app-input[formcontrolname="firstName"] input');
    this.lastNameField = page.locator('app-input[formcontrolname="lastName"] input');
    this.companyNameField = page.locator('app-input[formcontrolname="companyName"] input');
    this.emailField = page.locator('app-input[formcontrolname="email"] input');
    this.phoneField = page.locator('app-phone-number input[type="text"]');
    this.passwordField = page.locator('app-input[formcontrolname="password"] input');
    this.signUpButton = page.locator("//button[@type='submit']");
  }

  async assertErrorMessage(expected: string): Promise<void> {
    const locator = this.page.locator('//app-validation-message');
    if (!(await locator.isVisible())) {
        throw new Error(
        `Expected: ${expected}\nReceived: <message not found>`
        );
    }

    const actual = (await locator.textContent())?.trim() ?? "";

    if (actual !== expected) {
        throw new Error(
        `Expected: ${expected}\nReceived: ${actual}`
        );
        }
    }



  async fillFirstName(firstName: string) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName: string) {
    await this.lastNameField.fill(lastName);
  }

  async fillCompanyName(companyName: string) {
    await this.companyNameField.fill(companyName);
  }

  async fillPhone(phone: string) {
    await this.phoneField.nth(1).fill(phone);
  }

  async fillEmail(email: string) {
    await this.emailField.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordField.fill(password);
  }

  async selectIndustry(optionText: string) {
    await this.page.locator('ng-select[formcontrolname="industry"]').click();
    await this.page.locator('.ng-dropdown-panel .ng-option', { hasText: optionText }).click();
  }

  async selectPhoneCountryCode(code: string) {
    await this.page.locator('ng-select[placeholder="Country"]').click();
    await this.page.locator('.ng-dropdown-panel .ng-option', { hasText: code }).click();
  }

  async clickSignUpButton() {
    await this.signUpButton.click();
  }
}
