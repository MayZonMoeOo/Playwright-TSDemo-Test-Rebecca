import { test } from '@playwright/test';
import { VALID_USER } from '../data/Data';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { WishlistPage } from '../pages/WhislistPage';
import { ShoppingPage } from '../pages/ShoppingCartPage';
import { DashboardPage } from '../pages/DashboardPage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser(VALID_USER.email, VALID_USER.password);
});

test("Search Products and Add to Wishlist", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);

    // Clear the items from Shopping before add shopping item
    await cartlistPage.clearcartlist();
    await wishlistPage.clearWishlist();
});

test("Dashboard Test", async ({ page }) => {
    const homePage = new HomePage(page);
    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Clear the items from Shopping before add shopping item
    await cartlistPage.clearcartlist();
    await wishlistPage.clearWishlist();

    // 1. Navigate and verify products & prices
    await dashboardPage.navigateToDesktops();
    await dashboardPage.verifyProductListPrices();

    // 2. Filter testing
    await dashboardPage.applyPriceFilterAndVerify();
    await dashboardPage.removeFilterAndVerify();

    // 3. Add Jewelry to Wishlist
    await dashboardPage.addJewelryToWishlist();

    // 4. Add Computers & Notebooks to Cart
    await dashboardPage.addComputersAndNotebooksToCart();

    // 5. Logout
    await homePage.clickLogout(); 
    //await page.getByRole('link', { name: 'Log out' }).click();
});