import { test, expect } from '@playwright/test';

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

    await loginPage.loginUser(VALID_USER.email,VALID_USER.password);
});

test('Shopping Cart Total and Verify Notifications', async ({ page }) => {

    const wishlistPage = new WishlistPage(page);
    const cartlistPage = new ShoppingPage(page);
    const productsPage = new ProductsPage(page);

    // Clear Cart and Wishlist
    await cartlistPage.clearcartlist();

    await wishlistPage.clearWishlist();

    // Add Computers and Desktops Items to Cart
    await productsPage.addComputersAndDesktopsItems();

    await productsPage.verifyNotificationVisible();

    // Add Notebooks Item to Cart
    await productsPage.addNotebooksItem();

    await productsPage.verifyNotificationVisible();

    // Add Jewelry to Wishlist
    await productsPage.addJewelryToWishlist();

    await productsPage.verifyNotificationVisible();

    // Verify Mini Cart Hover
    await cartlistPage.verifyMiniCart();

    // Verify Cart Quantity
    await expect(cartlistPage.cartQty).not.toHaveText('(0)');

    // Click Go To Cart
    await cartlistPage.clickGoToCart();

    // Verify Shopping Cart Page
    await cartlistPage.verifyCartPage();

    // Navigate to Wishlist Page
    await page.getByRole('link', { name: 'Wishlist' }).first().click();

    await expect(page.locator('.page-title')).toContainText('Wishlist');

    // Navigate Back to Shopping Cart
    await cartlistPage.navigateToShoppingCart();

    // Verify Shopping Cart Again
    await cartlistPage.verifyCartPage();

});