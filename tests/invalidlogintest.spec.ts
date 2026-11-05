import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { VALID_USER } from '../data/Data';

test.beforeEach(async ({page}) =>{
  await new HomePage(page).goto();
})

test('Invalid Login Test', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  await homePage.clickLogin();
  await loginPage.loginUser('invalid.email@yopmail.com', VALID_USER.password);

  // Check the error message
  await expect(loginPage.errorMessages).toContainText('Login was unsuccessful. Please correct the errors and try again.');
  await expect(loginPage.errorMessages).toContainText('No customer account found');

  await loginPage.loginUser(VALID_USER.email, 'wrong');

  // Check the error message
  await expect(loginPage.errorMessages).toContainText('Login was unsuccessful. Please correct the errors and try again.');
  await expect(loginPage.errorMessages).toContainText('The credentials provided are incorrect');
});