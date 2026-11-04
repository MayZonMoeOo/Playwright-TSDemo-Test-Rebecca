import { Page, Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { WishlistPage } from './WhislistPage';

export class DashboardPage {
    readonly page: Page;
    readonly booksLink: Locator;
    readonly computerLink: Locator;
    readonly electronicsLink: Locator;
    readonly apparelshoesLink: Locator;
    readonly digitaldownloadLink: Locator;
    readonly jewelryLink: Locator;
    readonly giftcardLink: Locator;
    readonly wishlistTableRows: Locator;
    readonly shoppingTableRows: Locator;

    constructor(page: Page) {
        this.page = page;
        this.booksLink = page.locator('div.top-menu').locator('a.top-menu-triangle');
        this.computerLink = page.locator('div.top-menu').locator('a.top-menu-triangle');
        this.electronicsLink = page.locator('div.top-menu').locator('a.top-menu-triangle');
        this.apparelshoesLink = page.locator('div.top-menu').locator('a.top-menu-triangle');
        this.digitaldownloadLink = page.locator('div.top-menu').locator('a.top-menu-triangle');
        this.jewelryLink = page.locator('div.top-menu').locator('a.top-menu-triangle');
        this.giftcardLink = page.locator('div.top-menu').locator('a.top-menu-triangle');
        this.wishlistTableRows = page.locator('table.cart').locator('tr.cart-item-row');
        this.shoppingTableRows = page.locator('table.cart').locator('tr.cart-item-row');
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

    async clearShopping() {
        // Go to shoplist
        const homePage = new HomePage(this.page);
        await homePage.clickShopping;

        // Check the items and clear
        const shoppingitems = await this.shoppingTableRows.all();

        if (shoppingitems.length > 0) {
            for (const item of shoppingitems) {
                await item.locator('td.remove-from-cart input[type="checkbox"]').click();
            }
            await this.page.getByRole('button', { name: 'Update shopping cart' }).click();
        }
    }

    async goto() {
        await this.page.goto('https://demowebshop.tricentis.com/');
    }
}
