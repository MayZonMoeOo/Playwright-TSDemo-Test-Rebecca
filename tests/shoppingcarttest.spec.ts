import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { VALID_USER } from '../data/Data';
import { WishlistPage } from '../pages/WhislistPage';
import { ShoppingPage } from '../pages/ShoppingCartPage';
import { ProductsPage } from '../pages/ProductsPage';

test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser(VALID_USER.email, VALID_USER.password);
});

test("Shopping Cart Total and Verify Notifications", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);
    const productsPage = new ProductsPage(page);

    //Clear Cart and Wishlist
    await cartlistPage.clearcartlist();
    await wishlistPage.clearWishlist();

    //Action & Expect:addComputersAndNotebooksToCart
    await productsPage.addComputersAndDesktopsItems();
    await productsPage.verifyNotificationVisible();

    //Action & Expect:addNotebooksItem
    await productsPage.addNotebooksItem();
    await productsPage.verifyNotificationVisible();

    //Action & Expect:addJewelryToWishlist
    await productsPage.addJewelryToWishlist();
    await productsPage.verifyNotificationVisible();

    //Navigate between Shopping Cart and Wishlist
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('link', { name: 'Wishlist' }).first().click();
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();

    //Optional subtotal triggers if needed by app state
    await page.locator('tr:has-text("Build your own cheap computer")').locator('.product-subtotal').click();
    await page.locator('tr:has-text("14.1-inch Laptop")').locator('.product-subtotal').click();

    //Verifications using Page Objects
    await cartlistPage.verifyCartButtonsVisible();
    await cartlistPage.verifyItemPrices();
    await cartlistPage.verifyOrderTotals();
});