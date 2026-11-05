import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { VALID_USER } from '../data/Data';

test.beforeEach(async ({page}) =>{
    await new HomePage(page).goto();
});

test('Register New User',async ({page}) => {
      const homePage = new HomePage(page);
      const registerPage = new RegisterPage(page);
    
      // Create a unique email address with current datetime
      const uniqueEmail = `rebecca.oo_${Date.now()}@yopmail.com`;
    
      await page.getByRole('link', { name: 'Register' }).click();
      // Fill the user form with unique email
      await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName,uniqueEmail,VALID_USER.password);
    
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
});

test('Register Existing User',async ({page}) => {
    const homePage = new HomePage(page);
    const registerPage = new RegisterPage(page);

    await homePage.clickRegister();
    // Fill the register form with existing user information
    await registerPage.registerUser(VALID_USER.gender, VALID_USER.firstName, VALID_USER.lastName, VALID_USER.email, VALID_USER.password);

    // Check the error messgae is visible and show as 'The specified email already exists' or not
    await expect(registerPage.errorMessage).toBeVisible();
    await expect(registerPage.errorMessage).toHaveText("The specified email already exists")

} );

