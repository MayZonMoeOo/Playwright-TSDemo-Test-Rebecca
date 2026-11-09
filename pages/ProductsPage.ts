import { Page, expect} from '@playwright/test';

export class ProductsPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addComputersAndDesktopsItems() {
        await this.page.getByRole('link', { name: 'Computers' }).first().hover();
        await this.page.getByRole('link', { name: 'Desktops' }).click();
        await this.page.locator('#products-pagesize').selectOption('4');

        await this.page.getByRole('link', { name: '- 1200.00' }).click();
        await this.page.getByRole('link', { name: 'Remove Filter' }).click();
        await this.page.getByRole('link', { name: 'Desktops' }).first().click();    
        
        // Item 1: Build your own computer
        await this.page.getByRole('link', { name: 'Build your own computer', exact: true }).click();
        await this.page.getByRole('radio', { name: 'GB [+100.00]' }).check();
        await this.page.locator('#add-to-cart-button-16').click();      
                
        // Item 2: Build your own cheap computer
        await this.page.getByRole('link', { name: 'Desktops' }).first().click();
        await this.page.getByRole('link', { name: 'Build your own cheap computer', exact: true }).click();
        await this.page.getByRole('radio', { name: 'Fast [+100.00]' }).check();
        await this.page.getByRole('radio', { name: 'GB [+60.00]' }).check();
        await this.page.getByRole('checkbox', { name: 'Office Suite [+100.00]' }).check();
        await this.page.locator('#add-to-cart-button-72').click();
    }

    async addNotebooksItem() {
        // Item 3: 14.1-inch Laptop
        await this.page.getByRole('link', { name: 'Computers' }).first().hover();
        await this.page.getByRole('link', { name: 'Notebooks' }).first().click(); 
        await this.page.getByRole('link', { name: '14.1-inch Laptop', exact: true }).click();
        await this.page.locator('#add-to-cart-button-31').click();
    }

    async addJewelryToWishlist() {
        //Item 4: Black & White Diamond Heart
        await this.page.getByRole('link', { name: 'Jewelry' }).first().click();
        await this.page.locator('#products-pagesize').selectOption('4');
        await this.page.getByRole('link', { name: 'Black & White Diamond Heart', exact: true }).click();
        await this.page.getByRole('button', { name: 'Add to wishlist' }).click();
    }

    // --- EXPECTATIONS ---
    async verifyNotificationVisible() {
        await expect(this.page.locator('#bar-notification')).toBeVisible();
    }
}