import { expect, type Locator, type Page } from '@playwright/test';

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToUrl(url: string) {
    await this.page.goto(url);
  }

  async gotoPlatform() {
    await this.page.goto('/auth/sign-in');
  }

  async clickBtnByName(name: string) {
    await this.page.getByRole('button', { name }).click();
  }

  async expectResponseStatusCode(expectedStatusCode: number, urlPart: string) {
    const response = await this.page.waitForResponse((response) =>
      response.url().includes(urlPart)
    );

    const actualStatus = response.status();
    expect(actualStatus).toBe(expectedStatusCode);

    try {
      return await response.json();
    } catch {
      return await response.text();
    }
  }
}
