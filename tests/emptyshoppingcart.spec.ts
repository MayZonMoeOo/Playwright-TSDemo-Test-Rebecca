import { test, expect } from '@playwright/test';
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

    await loginPage.loginUser(
        VALID_USER.email,
        VALID_USER.password
    );
});

test('Empty Shopping Cart Test', async ({ page }) => {

    const wishlistPage = new WishlistPage(page);
    const cartPage = new ShoppingPage(page);
    const productsPage = new ProductsPage(page);

    // Clear existing cart and wishlist
    await cartPage.clearcartlist();
    await wishlistPage.clearWishlist();

    // Add three products to cart
    await productsPage.addProductsForEmptyCartTest();

    // Navigate to Shopping Cart
    await cartPage.navigateToShoppingCart();

    // Verify initial cart row count
    const initialRowCount = await cartPage.getCartRowCount();

    expect(initialRowCount).toBe(3);

    // Verify initial cart quantity
    await cartPage.verifyCartQty('(3)');

    // Remove first product
    await cartPage.removeProductAndVerifyRows('Build your own computer',2);

    await cartPage.verifyCartQty('(2)');

    // Remove second product
    await cartPage.removeProductAndVerifyRows('Build your own cheap computer',1);

    await cartPage.verifyCartQty('(1)');

    // Remove third product
    await cartPage.removeProductAndVerifyRows('14.1-inch Laptop',0);

    // Verify empty cart
    await cartPage.verifyEmptyCart();

    // Logout
    await page.getByRole('link', { name: 'Log out' }).click();

});