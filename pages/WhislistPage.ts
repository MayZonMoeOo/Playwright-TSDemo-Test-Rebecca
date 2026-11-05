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

}