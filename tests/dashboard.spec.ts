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
    //await page.goto("https://demowebshop.tricentis.com/");
    //await page.pause();
    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);
    const dashboardPage = new DashboardPage(page);

    // Clear the items from Shopping before add shopping item
    await cartlistPage.clearcartlist();
    await wishlistPage.clearWishlist();

    //Search 'Com' in search store 
    await dashboardPage.searchItemsStore();

    //Verify items in searchStore 
    await dashboardPage.verifySearchStore();
});

test("Dashboard Test with Encapsulated POM Actions & Expects", async ({ page }) => {
    const homePage = new HomePage(page);
    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);
    const dashboardPage = new DashboardPage(page);
    
    // Clear items before test
    await cartlistPage.clearcartlist();
    await wishlistPage.clearWishlist();

    // Navigate 
    await dashboardPage.navigateToDesktops();

    // Verify Category Heading
    await dashboardPage.verifyCategoryHeading();

    // Verify Product Prices
    await dashboardPage.verifyProductListPrices();

    // Verify Product Count Before Filter
    await dashboardPage.verifyProductCountBeforeFilter();

    // Apply Price Filter
    await dashboardPage.applyPriceFilter();

    // Verify Product Count After Filter
    await dashboardPage.verifyProductCountAfterFilter();

    // Verify Filtered Product Price
    await dashboardPage.verifyFilteredPrice();

    // Remove Price Filter
    await dashboardPage.removeFilter();

    // Verify Product Count After Removing Filter
    await dashboardPage.verifyProductCountAfterRemovingFilter();

    // Verify Product Prices
    await dashboardPage.verifyRemovedFilterPrices();

    // Add First Product to Wishlist (Jewelry)
    await dashboardPage.addJewelryToWishlist();
    await dashboardPage.verifyWishlistNotificationAndQty(1);

    // 5. Add Second Product to Wishlist (Apparel)
    await dashboardPage.addApparelToWishlist();
    await dashboardPage.verifyWishlistNotificationAndQty(2);

    // Verify Wishlist Page
    await dashboardPage.goToWishlistPage();

    // Add Three Products to Shopping Cart
    // Notification and quantity are verified after each addition
    await dashboardPage.addComputersAndNotebooksToCart();

    // 8. Navigate to Shopping Cart and Wishlist
    await dashboardPage.goToCartAndWishlistPages();

    // Logout
    //await homePage.clickLogout();
});


test.afterEach(async ({ page }) => {
    const homePage = new HomePage(page);
    
    // Logging out or clearing the session after every test
    const logoutBtn = page.getByRole('link', { name: 'Log out' });
    if (await logoutBtn.isVisible()) {
        await logoutBtn.click();
    }
});