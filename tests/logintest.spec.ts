import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { VALID_USER } from '../data/Data';

test.beforeEach(async ({page}) =>{
  await new HomePage(page).goto();
})

test('Login Test', async ({ page }) => {

  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);
  
  await homePage.clickLogin();    
  await loginPage.loginUser('rebecca.oo@yopmail.com','grapeseed@123');
  
  await expect(page.getByRole('link', { name: 'rebecca.oo@yopmail.com' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible();
});