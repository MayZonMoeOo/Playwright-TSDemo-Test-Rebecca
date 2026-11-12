import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { VALID_USER } from '../data/Data';
import { RegisterPage } from '../pages/RegisterPage';

test.beforeEach(async ({ page }) => {
  await new HomePage(page).goto();
})

test('Login Test', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);

  const uniqueEmail = `rebecca.oo_${Date.now()}@yopmail.com`;

  // Register
  await homePage.clickRegister();

  await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, uniqueEmail, VALID_USER.password);

  await expect(registerPage.resultMessage).toContainText('Your registration completed');

  await registerPage.clickContinue();

  // Logout
  await homePage.clickLogout();

  // Login using the same credentials
  await homePage.clickLogin();

  await loginPage.loginUser(uniqueEmail, VALID_USER.password);

  // Check Welcome to our store
  await expect(loginPage.welcomeHeading).toBeVisible();

  // Check logged-in account
  await expect(homePage.accountLink).toHaveText(uniqueEmail);
  await expect(homePage.logoutLink).toBeVisible();

  // Logout after successful login
  await homePage.clickLogout();
});

test('Invalid Login Test', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);
  const loginPage = new LoginPage(page);

  const testEmail = `testlogemail_${Date.now()}@yopmail.com`;

  // Prepare an existing account for wrong-password testing
  await homePage.clickRegister();

  await registerPage.registerUser(VALID_USER.gender,VALID_USER.firstName,VALID_USER.lastName,testEmail,VALID_USER.password);

  await expect(registerPage.resultMessage).toContainText('Your registration completed');

  await registerPage.clickContinue();

  // Logout after registration
  await homePage.clickLogout();

  // Test login with an unknown email
  await homePage.clickLogin();

  await loginPage.loginUser(`unknown_${Date.now()}@yopmail.com`, VALID_USER.password);

  await expect(loginPage.errorMessages).toContainText('Login was unsuccessful. Please correct the errors and try again.');
  await expect(loginPage.errorMessages).toContainText('No customer account found');

  // Test login with an existing email but wrong password
  await loginPage.loginUser(testEmail, 'wrong');

  await expect(loginPage.errorMessages).toContainText('Login was unsuccessful. Please correct the errors and try again.');
  await expect(loginPage.errorMessages).toContainText('The credentials provided are incorrect');
});

test('Duplicate Registration Test', async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  const email = `duplicatemail_${Date.now()}@yopmail.com`;

  await homePage.clickRegister();

  // First registration
  await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, email, VALID_USER.password);

  // Check the registration complete message is show as 'Your registration completed' or not
  await expect(registerPage.resultMessage).toContainText('Your registration completed');

  await registerPage.clickContinue();

  await homePage.clickLogout();

  // Try registering with the same email
  await homePage.clickRegister();

  await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, email, VALID_USER.password);

  // Check the error message for duplicate registration
  await expect(registerPage.errorMessage).toContainText('The specified email already exists');
});