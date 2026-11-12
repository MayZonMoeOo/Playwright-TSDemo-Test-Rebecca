import { Page, Locator, expect } from '@playwright/test';
import { WishlistPage } from './WhislistPage';

export class DashboardPage {
    readonly page: Page;
    readonly productGrid: Locator;
    readonly barNotification: Locator;
    readonly wishlistQty: Locator;
    readonly cartQty: Locator;
    readonly searchStore: Locator;
    readonly productName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productGrid = page.locator('.product-grid');
        this.barNotification = page.locator('div.bar-notification p.content');
        this.wishlistQty = page.locator('span.wishlist-qty');
        this.cartQty = page.locator('span.cart-qty');
        this.searchStore = page.locator('#small-searchterms');
        this.productName = page.locator('div.product-name h1');
    }

    // ACTIONS

    async searchItemsStore(){
    await this.page.locator('#small-searchterms').click();
    await this.page.locator('#small-searchterms').fill('Com');
    await this.page.getByText('Computing and Internet', { exact: true }).click();
    await this.page.getByText('Home / Books / Computing and').click();
    await this.page.locator('.product-name').click();
    }

    async navigateToDesktops() {
        await this.page.getByRole('link', { name: 'Computers' }).first().hover();
        await this.page.getByRole('link', { name: 'Desktops' }).click();
        await this.page.locator('#products-pagesize').selectOption('4');
    }

    async applyPriceFilter() {
        await this.page.getByRole('link', { name: '- 1200.00' }).click();
    }

    async removeFilter() {
        await this.page.getByRole('link', { name: 'Remove Filter' }).click();
    }

    async addJewelryToWishlist() {
        await this.page.getByRole('link', { name: 'Jewelry' }).first().click();
        await this.page.locator('#products-pagesize').selectOption('4');
        await this.page.getByRole('link', { name: 'Black & White Diamond Heart', exact: true }).click()
        await this.page.getByRole('button', { name: 'Add to wishlist' }).click();
    }
    async goToWishlistPage() {
        await this.page.getByRole('link', { name: 'Wishlist' }).first().click();
    }

    async addApparelToWishlist() {
        await this.page.getByRole('link', { name: 'Apparel & Shoes' }).first().click();
        await this.page.locator('#products-pagesize').selectOption('4');
        await this.page.getByRole('link', { name: 'Blue and green Sneaker', exact: true }).click();
        await this.page.getByRole('button', { name: 'Add to wishlist' }).click();
    }

    async addComputersAndNotebooksToCart() {
        
        await this.page.getByRole('link', { name: 'Computers' }).first().hover();
        await this.page.getByRole('link', { name: 'Desktops' }).first().click();

        // 1. Build your own computer
        await this.page.getByRole('link', { name: 'Build your own computer', exact: true }).click();
        await this.page.getByRole('radio', { name: 'GB [+100.00]' }).check();
        await this.page.locator('#add-to-cart-button-16').click();

        // Verify first product added
        await this.verifyCartNotificationAndQty(1);

        // 2. Build your own cheap computer
        await this.page.getByRole('link', { name: 'Desktops' }).first().click();
        await this.page.getByRole('link', { name: 'Build your own cheap computer', exact: true }).click();
        await this.page.getByRole('radio', { name: 'Fast [+100.00]' }).check();
        await this.page.getByRole('radio', { name: 'GB [+60.00]' }).check();
        await this.page.getByRole('checkbox', { name: 'Office Suite [+100.00]' }).check();
        await this.page.locator('#add-to-cart-button-72').click();

        // Verify second product added
        await this.verifyCartNotificationAndQty(2);

        // 3. 14.1-inch Laptop
        await this.page.getByRole('link', { name: 'Notebooks' }).first().click();
        await this.page.getByRole('link', { name: '14.1-inch Laptop', exact: true }).click();
        await this.page.locator('#add-to-cart-button-31').click();

        // Verify third product added
        await this.verifyCartNotificationAndQty(3);
    }

    async goToCartAndWishlistPages() {
        await this.page.getByRole('link', { name: 'Shopping cart' }).first().click();
        await this.page.getByRole('link', { name: 'Wishlist' }).first().click();
    }

    // EXPECTATIONS

    async verifySearchStore(){
        await expect(this.page.locator('.product-name h1')).toHaveText('Computing and Internet');
    }

    async verifyCategoryHeading() {
        await expect(this.page.getByRole('heading', {name: 'Desktops'})).toBeVisible();
    }

    async verifyProductCountBeforeFilter() {
        await expect(this.page.locator('.product-item')).toHaveCount(4);
    }

    async verifyProductCountAfterFilter() {
        await expect(this.page.locator('.product-item')).toHaveCount(1);
    }

    async verifyProductCountAfterRemovingFilter() {
        await expect(this.page.locator('.product-item')).toHaveCount(4);
    }

    async verifyProductListPrices() {
        const productDetailsText = await this.productGrid.textContent();
        await expect(productDetailsText).toContain('Build your own cheap computer');
        await expect(productDetailsText).toContain('800.00');
        await expect(productDetailsText).toContain('Build your own computer');
        await expect(productDetailsText).toContain('1200.00');
        await expect(productDetailsText).toContain('Build your own expensive computer');
        await expect(productDetailsText).toContain('1800.00');
        await expect(productDetailsText).toContain('Desktop PC with CDRW');
        await expect(productDetailsText).toContain('500.00');
    }

    async verifyFilteredPrice() {
        await expect(this.page.locator('.product-item').filter({ hasText: 'Build your own computer' }).locator('div.prices')).toContainText('1200.00');
    }

    async verifyRemovedFilterPrices() {
        await expect(this.page.locator('div.prices').nth(0)).toContainText('800.00');
        await expect(this.page.locator('div.prices').nth(1)).toContainText('1200.00');
        await expect(this.page.locator('div.prices').nth(2)).toContainText('1800.00');
        await expect(this.page.locator('div.prices').nth(3)).toContainText('500.00');
    }

    async verifyWishlistNotificationAndQty(expectedQty: number) {
        await expect(this.barNotification).toContainText('The product has been added to your wishlist');
        //await expect(this.wishlistQty).toHaveText('(1)');
        await expect(this.wishlistQty).toHaveText(`(${expectedQty})`);

    }

    async verifyCartNotificationAndQty(expectedQty: number) {
        await expect(this.barNotification).toContainText('The product has been added to your shopping cart');
        await expect(this.cartQty).toHaveText(`(${expectedQty})`);
    }
}
