import { test, expect } from '../fixtures/customFixtures';
import { ErrorLoginResponse } from '../model/loginModels';
import { users } from '../utils/usersColection';

const TEST_DATA = {
  invalidCredentials: {
    email: "repmv111@mailinator.com",
    password: "123wer"
  },

  errorSignInMsg: {
    invalidPassword: "INVALID_PASSWORD",
    invalidEmail: "EMAIL_NOT_FOUND"
  },
  
} as const;

test.describe('Login RepMove UI Tests', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.gotoPlatform();
  });

  test('Should login successfully with valid credentials UI Test', async ({ basePage, loginPage }) => {
    await loginPage.login(users.standard.login, process.env.PASSWORD!);
    await loginPage.checkTypePasswordField('type', 'password');
    await basePage.expectResponseStatusCode(200, process.env.LOGIN_API_URL!);
  });

  test('Login with invalid email credentials UI Test', async ({ basePage, loginPage }) => {
    await loginPage.login(TEST_DATA.invalidCredentials.email, process.env.PASSWORD!);
    const response: ErrorLoginResponse = await basePage.expectResponseStatusCode(400, process.env.LOGIN_API_URL!);
    expect(response.error.message).toBe(TEST_DATA.errorSignInMsg.invalidEmail);
  });

  test('Login with invalid password credentials UI Test', async ({ basePage, loginPage }) => {
    await loginPage.login(users.standard.login, TEST_DATA.invalidCredentials.password);
    const response: ErrorLoginResponse = await basePage.expectResponseStatusCode(400, process.env.LOGIN_API_URL!);
    expect(response.error.message).toBe(TEST_DATA.errorSignInMsg.invalidPassword);
  });
})
