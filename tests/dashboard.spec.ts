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

        const homePage = new HomePage(page);
        const wishlistPage = new WishlistPage(page);
        const cartlistPage = new ShoppingPage(page);
        
        // Clear the items from Shopping before add shopping item
        await cartlistPage.clearcartlist();
        // Clear the items from Wishlist before add wishlist item
        await wishlistPage.clearWishlist();

    await page.getByRole('link', { name: 'Computers' }).first().hover();
    await page.getByRole('link', { name: 'Desktops' }).click();
    await page.locator('#products-pagesize').selectOption('4');
    
    let ProductDetails = '';
    const displayProducts = await page.locator('div.product-grid').locator('div.product-item').all();
    if (displayProducts.length > 0) {
        for (const product of displayProducts) {
            ProductDetails += await product.locator('h2.product-title').textContent() || '';
            ProductDetails += await product.locator('div.prices').textContent() || '';
        }
    }
    
    const productDetailsText = await page.locator('.product-grid').textContent();
    await expect(productDetailsText).toContain('Build your own cheap computer');
    await expect(productDetailsText).toContain('800.00');
    await expect(productDetailsText).toContain('Build your own computer');
    await expect(productDetailsText).toContain('1200.00');
    await expect(productDetailsText).toContain('Build your own expensive computer');
    await expect(productDetailsText).toContain('1800.00');
    await expect(productDetailsText).toContain('Desktop PC with CDRW');
    await expect(productDetailsText).toContain('500.00');

    await page.getByRole('link', { name: '- 1200.00' }).click();

    //Verify item price
    await expect(page.locator('.product-item').filter({ hasText: 'Build your own computer' }).locator('div.prices')).toContainText('1200.00');
    //await expect(page.locator('div.prices').nth(0)).toContainText('1200.00');

    await page.getByRole('link', { name: 'Remove Filter' }).click();

    //Verify item price when Remove Filter
    await expect(page.locator('div.prices').nth(0)).toContainText('800.00');
    await expect(page.locator('div.prices').nth(1)).toContainText('1200.00');
    await expect(page.locator('div.prices').nth(2)).toContainText('1800.00');
    await expect(page.locator('div.prices').nth(3)).toContainText('500.00');

    //add whislist
    await page.getByRole('link', { name: 'Jewelry' }).first().click();
    await page.locator('#products-pagesize').selectOption('4');

    //await page.getByRole('link', { name: 'Black & White Diamond Heart', exact: true }).click();
    //await page.getByText('Black & White Diamond Heart', { exact: false }).first().click();
    await page.locator('h2.product-title a', { hasText: 'Black & White Diamond Heart' }).click();
    await page.getByRole('button', { name: 'Add to wishlist' }).click();

    //Verify that after every item added a notification with text 
    await expect(page.locator('div.bar-notification p.content')).toContainText('The product has been added to your wishlist');

    //Verify item count
    await expect(page.locator('span.wishlist-qty')).toHaveText('(1)');
    
    await page.getByRole('link', { name: 'Wishlist' }).first().click();

    //add cart
    await page.getByRole('link', { name: 'Computers' }).first().hover();
    await page.getByRole('link', { name: 'Desktops' }).first().click();
    await page.getByRole('link', { name: 'Build your own computer', exact: true }).click();
    await page.getByRole('listitem').filter({ hasText: 'GB [+100.00]' }).click();
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
    
    //Verify that after every item added a notification with text 
    await expect(page.locator('#bar-notification p.content')).toContainText('The product has been added to your shopping cart');
    //await expect(page.locator('div.bar-notification p.content')).toContainText('The product has been added to your shopping cart');

    //Verify item count
    await expect(page.locator('span.cart-qty')).toHaveText('(3)');

    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('link', { name: 'Wishlist' }).first().click();

    await page.getByRole('link', { name: 'Log out' }).click();
    
});

