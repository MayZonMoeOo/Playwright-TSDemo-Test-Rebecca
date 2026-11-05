import { test, expect } from '@playwright/test';
import { VALID_USER } from '../data/Data';
import { HomePage } from '../pages/HomePage';
import { LoginPage} from '../pages/LoginPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser(VALID_USER.email,VALID_USER.password);
});

test("Empty Shopping Cart",async ({page}) => {
    //await page.goto("https://demowebshop.tricentis.com/cart");
    //await page.pause();
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('row', { name: 'Picture of Build your own computer' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Update shopping cart' }).click();
    await page.getByRole('link', { name: 'Log out' }).click();
});

