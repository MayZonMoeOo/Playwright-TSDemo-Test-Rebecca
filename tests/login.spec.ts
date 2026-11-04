import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';

test.beforeEach(async ({page}) =>{
  await new HomePage(page).goto();
})

test('Login Test with valid credential', async ({ page }) => {
  //await page.goto('https://demowebshop.tricentis.com/');
  //await page.getByRole('link', { name: 'Log in' }).click();

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  
  await homePage.clickLogin();    
  await loginPage.loginUser('rebecca.oo@yopmail.com','grapeseed@123');
  
  await expect(page.getByRole('link', { name: 'rebecca.oo@yopmail.com' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
});


test('Login Test with invalid credential', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  
  await homePage.clickLogin();    

  //login with wrong email
  await loginPage.loginUser('invalidemail@yopmail.com','grapeseed@123');
  
  // Check the error message with wrong email
  await expect(loginPage.errorMessages).toContainText('Login was unsuccessful. Please correct the errors and try again.');
  await expect(loginPage.errorMessages).toContainText('No customer account found');

  //login with wrong password
  await loginPage.loginUser('rebecca.oo@yopmail.com','wrongpwd');
  
  // Check the error message with wrong password
  await expect(loginPage.errorMessages).toContainText('Login was unsuccessful. Please correct the errors and try again.');
  await expect(loginPage.errorMessages).toContainText('The credentials provided are incorrect');

});







