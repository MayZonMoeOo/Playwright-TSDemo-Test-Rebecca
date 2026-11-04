import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly registerLink: Locator;
    readonly loginLink: Locator;
    readonly logoutLink: Locator;
    readonly accountLink: Locator;
    readonly shoppingLink: Locator;
    readonly wishlistLink: Locator;

    constructor (page:Page){
    this.page = page;
    this.registerLink = page.locator('div.header-links').locator('a.ico-register');
    this.accountLink = page.locator('div.header-links').locator('a.account');
    this.loginLink = page.locator('div.header-links').locator('a.ico-login');
    this.logoutLink = page.locator('div.header-links').locator('a.ico-logout');
    this.shoppingLink = page.locator('div.header-links').locator('a.ico-cart');
    this.wishlistLink = page.locator('div.header-links').locator('a.ico-wishlist');
    }
    async goto() {
        await this.page.goto('https://demowebshop.tricentis.com/');
    }

    async clickRegister() {
        await this.registerLink.click();
    }

    async clickLogin() {
        await this.loginLink.click();
    }

    async clickLogout() {
        await this.logoutLink.click();
    }

    async clickShopping() {
        await this.shoppingLink.click();
    }

    async clickWishlist() {
        await this.wishlistLink.click();
    }
}

