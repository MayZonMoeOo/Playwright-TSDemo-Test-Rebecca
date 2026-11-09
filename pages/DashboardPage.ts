import { Page, Locator, expect } from '@playwright/test';
import { WishlistPage } from './WhislistPage';

export class DashboardPage {
    readonly page: Page;
    readonly productGrid: Locator;
    readonly barNotification: Locator;
    readonly wishlistQty: Locator;
    readonly cartQty: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productGrid = page.locator('.product-grid');
        this.barNotification = page.locator('div.bar-notification p.content');
        this.wishlistQty = page.locator('span.wishlist-qty');
        this.cartQty = page.locator('span.cart-qty');
    }

    // ACTIONS

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
        await this.page.locator('h2.product-title a', { hasText: 'Black & White Diamond Heart' }).click();
        await this.page.getByRole('button', { name: 'Add to wishlist' }).click();
        //await this.page.getByRole('link', { name: 'Wishlist' }).first().click();
    }
    async goToWishlistPage() {
        await this.page.getByRole('link', { name: 'Wishlist' }).first().click();
    }

    async addComputersAndNotebooksToCart() {
        await this.page.getByRole('link', { name: 'Computers' }).first().hover();
        await this.page.getByRole('link', { name: 'Desktops' }).first().click();
        
        // 1. Build your own computer
        await this.page.getByRole('link', { name: 'Build your own computer', exact: true }).click();
        await this.page.getByRole('radio', { name: 'GB [+100.00]' }).check();
        await this.page.locator('#add-to-cart-button-16').click();
        
        // 2. Build your own cheap computer
        await this.page.getByRole('link', { name: 'Desktops' }).first().click();
        await this.page.getByRole('link', { name: 'Build your own cheap computer', exact: true }).click();
        await this.page.getByRole('radio', { name: 'Fast [+100.00]' }).check();
        await this.page.getByRole('radio', { name: 'GB [+60.00]' }).check();
        await this.page.getByRole('checkbox', { name: 'Office Suite [+100.00]' }).check();
        await this.page.locator('#add-to-cart-button-72').click();
        
        // 3. 14.1-inch Laptop
        await this.page.getByRole('link', { name: 'Notebooks' }).first().click();
        await this.page.getByRole('link', { name: '14.1-inch Laptop', exact: true }).click();
        await this.page.locator('#add-to-cart-button-31').click();

        //await this.page.getByRole('link', { name: 'Shopping cart' }).first().click();
        //await this.page.getByRole('link', { name: 'Wishlist' }).first().click();
    }
    async goToCartAndWishlistPages() {
        await this.page.getByRole('link', { name: 'Shopping cart' }).first().click();
        await this.page.getByRole('link', { name: 'Wishlist' }).first().click();
    }

    // EXPECTATIONS

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

    async verifyWishlistNotificationAndQty() {
        await expect(this.barNotification).toContainText('The product has been added to your wishlist');
        await expect(this.wishlistQty).toHaveText('(1)');
    }

    async verifyCartNotificationAndQty() {
        await expect(this.barNotification).toContainText('The product has been added to your shopping cart');
        await expect(this.cartQty).toHaveText('(3)');
    }
}
