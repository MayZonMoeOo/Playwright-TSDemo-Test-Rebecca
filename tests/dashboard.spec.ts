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

test("Dashboard Test with Encapsulated POM Actions & Expects", async ({ page }) => {
    const homePage = new HomePage(page);
    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Clear items before test
    await cartlistPage.clearcartlist();
    await wishlistPage.clearWishlist();

    // Navigate and Verify Prices
    await dashboardPage.navigateToDesktops();
    await dashboardPage.verifyProductListPrices();

    // Apply Filter and Verify
    await dashboardPage.applyPriceFilter();
    await dashboardPage.verifyFilteredPrice();

    // Remove Filter and Verify
    await dashboardPage.removeFilter();
    await dashboardPage.verifyRemovedFilterPrices();

    // Add Jewelry to Wishlist and Verify
    await dashboardPage.addJewelryToWishlist();
    await dashboardPage.verifyWishlistNotificationAndQty();
    await dashboardPage.goToWishlistPage();

    // Add Computers/Notebooks to Cart and Verify
    await dashboardPage.addComputersAndNotebooksToCart();
    await dashboardPage.verifyCartNotificationAndQty();

    //Go to Whislist and Shopping Cart
    await dashboardPage.goToCartAndWishlistPages();

    // Logout
    await homePage.clickLogout();
});