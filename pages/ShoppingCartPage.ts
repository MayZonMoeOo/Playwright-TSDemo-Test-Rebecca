import { Page, Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export class ShoppingPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly cartTableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#small-searchterms');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.cartTableRows = page.locator('table.cart').locator('tr.cart-item-row');
    }

    // Clear the items from cart
    async clearcartlist() {
        // Go to cartlist
        const homePage = new HomePage(this.page);
        await homePage.clickShopping();

        // Check the items and clear
        const cartlistitems = await this.cartTableRows.all();

        if (cartlistitems.length > 0) {
            for (const item of cartlistitems) {
                await item.locator('td.remove-from-cart input[type="checkbox"]').click();
            }
            await this.page.getByRole('button', { name: 'Update shopping cart' }).click();
        }
    }

}