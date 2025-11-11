import { faker } from '@faker-js/faker';
import { test, expect } from '../fixtures/customFixtures';
import { NewUserModel } from '../model/signUpModel';

test.describe('SignUp RepMove UI Tests', () => {
  test.beforeEach(async ({ basePage }) => {
    await basePage.gotoPlatform();
    await basePage.clickBtnByName('Sign Up Now');
  });

    test('Should create new user successfully with valid credentials UI Test', async ({ basePage, signUpPage }) => {
        const testUserData = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            companyName: faker.company.name(),
            industry: 'Medical',
            email: `testuser${Date.now()}@gmail.com`,
            phoneCountryCode: '+380',
            phone: '681754500',
            password: '123qwe',
            };

        await signUpPage.fillFirstName(testUserData.firstName);
        await signUpPage.fillLastName(testUserData.lastName);
        await signUpPage.fillCompanyName(testUserData.companyName);
        await signUpPage.selectIndustry(testUserData.industry);
        await signUpPage.fillEmail(testUserData.email);
        await signUpPage.selectPhoneCountryCode(testUserData.phoneCountryCode);
        await signUpPage.fillPhone(testUserData.phone);
        await signUpPage.fillPassword(testUserData.password);

        await signUpPage.clickSignUpButton();

        const response: NewUserModel = await basePage.expectResponseStatusCode(
            200,
            process.env.SIGN_UP_API_URL!
        );

        expect(response.result.email).toBe(testUserData.email);
        expect(response.result.companyName).toBe(testUserData.companyName);
        expect(response.result.industry).toBe(testUserData.industry);
    });

    test('SignUp without CompanyName field UI Test', async ({ signUpPage }) => {
        const testUserData = {
            firstName: 'Test',
            lastName: 'Last',
            industry: 'Medical',
            email: `testuser${Date.now()}@gmail.com`,
            phoneCountryCode: '+380',
            phone: '681754500',
            password: '123qwe',
            };

        const errroMsg = 'The Company Name is required';

        await signUpPage.fillFirstName(testUserData.firstName);
        await signUpPage.fillLastName(testUserData.lastName);
        await signUpPage.selectIndustry(testUserData.industry);
        await signUpPage.fillEmail(testUserData.email);
        await signUpPage.selectPhoneCountryCode(testUserData.phoneCountryCode);
        await signUpPage.fillPhone(testUserData.phone);
        await signUpPage.fillPassword(testUserData.password);
        await signUpPage.clickSignUpButton();

        await signUpPage.assertErrorMessage(errroMsg);
    });

    test('SignUp without Email field UI Test', async ({ signUpPage }) => {
        const testUserData = {
            firstName: 'Test',
            lastName: 'Last',
            companyName: 'Test',
            industry: 'Medical',
            phoneCountryCode: '+380',
            phone: '681754500',
            password: '123qwe',
            };
            
        const errroMsg = 'Please, enter your email address';

        await signUpPage.fillFirstName(testUserData.firstName);
        await signUpPage.fillLastName(testUserData.lastName);
        await signUpPage.fillCompanyName(testUserData.companyName);
        await signUpPage.selectIndustry(testUserData.industry);
        await signUpPage.selectPhoneCountryCode(testUserData.phoneCountryCode);
        await signUpPage.fillPhone(testUserData.phone);
        await signUpPage.fillPassword(testUserData.password);
        await signUpPage.clickSignUpButton();

        await signUpPage.assertErrorMessage(errroMsg);

    });
})
