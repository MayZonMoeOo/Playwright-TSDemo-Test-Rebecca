import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';

test.beforeEach(async ({page}) =>{
    await new HomePage(page).goto();
});

test('Register Existing User',async ({page}) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.clickRegister();
    
    await registerPage.registerUser('Female','Rebecca','Oo','rebecca.oo@yopmail.com','grapeseed@123');
    
    //Check errorMessage is visible and shown the 'The specified email already exists' or not
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText('The specified email already exists');

} );

 test("Register New User", async ({ page }) => {
  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  // Create a unique email address with current datetime
  const uniqueEmail = `rebecca.oo_${Date.now()}@yopmail.com`;

  // Fill the user form with unique email
  await registerPage.registerUser('Female','Rebecca','Oo',uniqueEmail,'grapeseed@123');

  // Check the registration complete message is visible and show as 'Your registration completed' or not
  await expect(registerPage.resultMessage).toBeVisible();
  await expect(registerPage.resultMessage).toHaveText('Your registration completed');

  // Click the 'Continue' button from registration complete form
  await registerPage.clickContinue();

  // Check the home page menu, first link is unique email and second link is 'Log out' or not
  await expect(homePage.accountLink).toBeVisible();
  await expect(homePage.accountLink).toHaveText(uniqueEmail);
  await expect(homePage.logoutLink).toBeVisible();
  await expect(homePage.logoutLink).toHaveText("Log out");

  // Click 'Log out' button
  await homePage.clickLogout();

  // Check the home page menu, first link is 'Register' and second link is 'Log in' or not
  await expect(homePage.registerLink).toBeVisible();
  await expect(homePage.registerLink).toHaveText("Register");
  await expect(homePage.loginLink).toBeVisible();
  await expect(homePage.loginLink).toHaveText("Log in");
});

