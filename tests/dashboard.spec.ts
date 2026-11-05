import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { WishlistPage } from '../pages/WhislistPage';
import { DashboardPage } from '../pages/DashboardPage';
import { VALID_USER } from '../data/Data';
import { ShoppingPage } from '../pages/ShoppingCartPage';

test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser(VALID_USER.email,VALID_USER.password);
});

test("Search Products and Add to Wishlist", async ({ page }) => {
    const homePage = new HomePage(page);
    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);

    // Clear the items from Shopping before add shopping item
    await cartlistPage.clearcartlist();
    // Clear the items from Wishlist before add wishlist item
    await wishlistPage.clearWishlist();

});

test("Dashboard Test", async ({page}) => {
    //await page.goto("https://demowebshop.tricentis.com/");
    //await page.pause();

    await page.getByRole('link', { name: 'Computers' }).first().hover();
    await page.getByRole('link', { name: 'Desktops' }).click();
    await page.locator('#products-pagesize').selectOption('4');
    await page.getByRole('link', { name: '- 1200.00' }).click();
    await page.getByRole('link', { name: 'Remove Filter' }).click();
    await page.getByRole('link', { name: 'Desktops' }).first().click();
    await page.getByRole('link', { name: 'Build your own computer', exact: true }).click();
    await page.getByRole('radio', { name: 'GB [+100.00]' }).check();
    await page.locator('#add-to-cart-button-16').click();
    await page.getByRole('link', { name: 'Desktops' }).first().click();
    await page.getByRole('link', { name: 'Build your own cheap computer', exact: true }).click();
    await page.getByRole('radio', { name: 'Fast [+100.00]' }).check();
    await page.getByRole('radio', { name: 'GB [+60.00]' }).check();
    await page.getByRole('checkbox', { name: 'Office Suite [+100.00]' }).check();
    await page.locator('#add-to-cart-button-72').click();
    await page.getByRole('link', { name: 'Notebooks' }).first().click();
    await page.getByRole('link', { name: '14.1-inch Laptop', exact: true }).click();
    await page.locator('#add-to-cart-button-31').click();
    await page.getByRole('link', { name: 'Jewelry' }).first().click();
    await page.locator('#products-pagesize').selectOption('4');
    await page.getByRole('link', { name: 'Black & White Diamond Heart', exact: true }).click();
    await page.getByRole('button', { name: 'Add to wishlist' }).click();
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('link', { name: 'Wishlist' }).first().click();


    
});

