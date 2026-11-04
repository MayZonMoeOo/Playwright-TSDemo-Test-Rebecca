import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';
import { WishlistPage } from '../pages/WhislistPage';
import { DashboardPage } from '../pages/DashboardPage';

test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser('rebecca.oo@yopmail.com','grapeseed@123');
});

test("Search Products and Add to Wishlist", async ({ page }) => {
    const homePage = new HomePage(page);
    const wishlistPage = new WishlistPage(page);
    const dashboardPage = new DashboardPage(page);

    // Clear the items from Shopping before add shopping item
    await dashboardPage.clearShopping();
    // Clear the items from Wishlist before add wishlist item
    await wishlistPage.clearWishlist();

});

test("Choose Desktop", async ({page}) => {
    
    await page.getByRole('link', { name: 'Computers' }).first().hover();
    await page.getByRole('link', { name: 'Desktops' }).first().click();
    await page.locator('#products-pagesize').selectOption('4');
    await page.getByRole('link', { name: '- 1200.00' }).click();
    await page.getByRole('link', { name: 'Remove Filter' }).click();
    await page.getByRole('button', { name: 'Add to cart' }).first().click();
    await page.getByRole('checkbox', { name: 'Other Office Suite [+40.00]' }).check();
    await page.locator('#add-to-cart-button-72').click();
    await page.getByRole('link', { name: 'Jewelry' }).first().click();
    await page.locator('#products-pagesize').selectOption('4');
    await page.getByRole('link', { name: 'Black & White Diamond Heart', exact: true }).click();
    await page.getByRole('button', { name: 'Add to wishlist' }).click();
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('link', { name: 'Wishlist' }).first().click();

    //await page.pause();
});

