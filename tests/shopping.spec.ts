import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { WishlistPage } from '../pages/WishlistPage';

test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser('rebecca.oo@yopmail.com','grapeseed@123');
});

test("Purchase Desktop and Notebook", async ({ page }) => {
    const homePage = new HomePage(page);
    const checkoutPage = new CheckoutPage(page);

    // Clear the items from Cart before add product
    await checkoutPage.clearCart();

    // Add products to cart
    await checkoutPage.addCustomDesktopToCart();
    await checkoutPage.addNotebookToCart();

    // Go to cart
    await homePage.clickShopping();

    // Checkout process
    await checkoutPage.proceedCheckout();

    // Confirm and verify final order details
    await checkoutPage.continueButton.click();

    // Check the final order
    const orderBody = page.locator('body');
    await page.fill('#BillingNewAddress_Company', 'GrapeSEED');    
    await page.selectOption('#BillingNewAddress_CountryId', 'United States');
    await page.selectOption('#BillingNewAddress_StateProvinceId','Alaska');
    await page.fill('#BillingNewAddress_City', 'Anchorage');
    await page.fill('#BillingNewAddress_Address1', '632 West 6th Avenue, Anchorage, AK 99501');
    await page.fill('#BillingNewAddress_ZipPostalCode', '99524');
    await page.fill('#BillingNewAddress_PhoneNumber', '(907) 343-8192');
});
