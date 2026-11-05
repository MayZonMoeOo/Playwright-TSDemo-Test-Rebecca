import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { VALID_USER } from '../data/Data';
import { RegisterPage } from '../pages/RegisterPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser(VALID_USER.email,VALID_USER.password);
});

test("Shopping Cart Total",async ({page}) => {
    //await page.goto("https://demowebshop.tricentis.com/");
    //await page.pause();
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.locator('tr:has-text("Build your own cheap computer")').locator('.product-subtotal').click();
    await page.locator('tr:has-text("14.1-inch Laptop")').locator('.product-subtotal').click();

    // Verify order totals before confirmation
    const orderSummary = page.locator('table.cart-total');
    await expect(orderSummary).toContainText('Sub-Total: 2650.00');
    await expect(orderSummary).toContainText('Shipping: 0.00');
    await expect(orderSummary).toContainText('Tax: 0.00');
    await expect(orderSummary).toContainText('Total: 2650.00');


});


