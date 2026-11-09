import { test } from '@playwright/test';
import { VALID_USER } from '../data/Data';
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
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

test("Empty Shopping Cart Test", async ({ page }) => {
    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);
    const productsPage = new ProductsPage(page);
    const homePage = new HomePage(page);

    // Clear items before adding new ones
    await cartlistPage.clearcartlist();
    await wishlistPage.clearWishlist();

    // Action & Expect:addComputersAndDesktopsItems
    await productsPage.addComputersAndDesktopsItems();
    await productsPage.verifyNotificationVisible();

    // Action & Expect:addNotebooksItem
    await productsPage.addNotebooksItem();
    await productsPage.verifyNotificationVisible();
    
    // Action & Expect:addJewelryToWishlist
    await productsPage.addJewelryToWishlist();
    await productsPage.verifyNotificationVisible();

    // Navigate to Shopping Cart
    await cartlistPage.navigateToShoppingCart();

    // Verify buttons, prices, and totals
    await cartlistPage.verifyCartButtonsVisible();
    await cartlistPage.verifyItemPrices();
    await cartlistPage.verifyOrderTotals();
    await cartlistPage.verifyCartQty('(3)');

    // Delete items one by one and verify quantity changes
    await cartlistPage.removeFirstItemAndVerifyQty('Build your own computer', '(2)');
    await cartlistPage.removeFirstItemAndVerifyQty('Build your own cheap computer', '(1)');
    
    // Delete the last item and verify empty cart state
    await cartlistPage.page.locator('tr').filter({ hasText: '14.1-inch Laptop' }).locator('input[name="removefromcart"]').check();
    await cartlistPage.updateCartButton.click();

    await cartlistPage.verifyEmptyCart();

    // Log out
    await homePage.clickLogout(); 
    //await page.getByRole('link', { name: 'Log out' }).click();
});