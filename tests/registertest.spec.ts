import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { VALID_USER } from '../data/Data';

test.beforeEach(async ({ page }) => {
    await new HomePage(page).goto();
});

test('Register New User', async ({ page }) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    // Create a unique email address with current datetime
    const uniqueEmail = `rebecca.oo_${Date.now()}@yopmail.com`;

    await homePage.clickRegister();
    // Fill the user form with unique email
    await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, uniqueEmail, VALID_USER.password);

    // Check the registration complete message is visible and show as 'Your registration completed' or not
    await expect(registerPage.resultMessage).toBeVisible();
    await expect(registerPage.resultMessage).toContainText('Your registration completed');

    // Click the 'Continue' button from registration complete form
    await registerPage.clickContinue();

    // Check the home page menu, first link is unique email and second link is 'Log out' or not
    await expect(homePage.accountLink).toBeVisible();
    await expect(homePage.accountLink).toHaveText(uniqueEmail);
    await expect(homePage.logoutLink).toBeVisible();
    await expect(homePage.logoutLink).toHaveText("Log out");

    // Click 'Log out' button
    await homePage.clickLogout();
});

test('Register Existing User', async ({ page }) => {

    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    // Register a new user with unique email
    const testEmail = `testmail_${Date.now()}@yopmail.com`;

    // First registration
    await homePage.clickRegister();

    await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, testEmail, VALID_USER.password);

    await expect(registerPage.resultMessage).toContainText('Your registration completed');

    await registerPage.clickContinue();

    await homePage.clickLogout();

    // Register again using the same email
    await homePage.clickRegister();

    await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, testEmail, VALID_USER.password);

    await expect(registerPage.errorMessage).toContainText('The specified email already exists');

});


