import { test as baseTest } from '@playwright/test';
import { BasePage} from '../pageObjects/basePageObject';
import { LoginPage } from '../pageObjects/loginPageObject';
import { SignUpPage } from '../pageObjects/signUpPageObject';

type PageObjects = {
  basePage: BasePage;
  loginPage: LoginPage;
  signUpPage: SignUpPage;
};

export const test = baseTest.extend<PageObjects>({
  basePage: async ({page}, use) => {
    await use(new BasePage(page))
  }, 

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  signUpPage: async ({ page }, use) => {
    await use(new SignUpPage(page));
  },

});

export { expect } from '@playwright/test';