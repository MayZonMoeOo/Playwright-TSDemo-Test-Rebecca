import { Page, Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export class WishlistPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly wishlistTableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#small-searchterms');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.wishlistTableRows = page.locator('table.cart').locator('tr.cart-item-row');
    }

    // Clear the items from Wishlist
    async clearWishlist() {
        // Go to wishlist
        const homePage = new HomePage(this.page);
        await homePage.clickWishlist();

        // Check the items and clear
        const wishlistitems = await this.wishlistTableRows.all();

        if (wishlistitems.length > 0) {
            for (const item of wishlistitems) {
                await item.locator('td.remove-from-cart input[type="checkbox"]').click();
            }
            await this.page.getByRole('button', { name: 'Update wishlist' }).click();
        }
    }

    // First product search & add to wishlist
    async addFirstProductToWishlist() {
        await this.searchInput.fill('Digital SLR Camera');
        await this.searchButton.click();

        await this.page.getByRole('link', { name: 'Digital SLR Camera 12.2 Mpixel', exact: true }).click();
        await this.page.locator('#add-to-wishlist-button-18').click();
    }

    // Second product search & add to wishlist
    async addSecondProductToWishlist() {
        await this.searchInput.fill('diamond');
        await this.searchButton.click();
        
        await this.page.getByRole('link', { name: 'Black & White Diamond Heart', exact: true }).click();
        await this.page.getByRole('button', { name: 'Add to wishlist' }).click();
    }

    // Get combined text content of wishlist items
    async getWishlistData(): Promise<string> {
        const wishlistitems = await this.wishlistTableRows.all();

        let dataValue = "";
        for (const item of wishlistitems) {
            const productText = await item.locator('td.product').textContent() || "";
            const subtotalText = await item.locator('td.subtotal').textContent() || "";
            dataValue += productText + subtotalText;
        }
        return dataValue;
    }
}