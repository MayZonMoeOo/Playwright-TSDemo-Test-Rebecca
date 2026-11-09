import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export class ShoppingPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly cartTableRows: Locator;
    readonly emptyCartMessage: Locator;
    readonly updateCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly estimateShippingButton: Locator;
    readonly orderSummary: Locator;
    readonly cartQty: Locator;
    readonly emptyCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('#small-searchterms');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.cartTableRows = page.locator('table.cart').locator('tr.cart-item-row');
        this.emptyCartMessage = page.locator('.order-summary-content');
        this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue shopping' });
        this.estimateShippingButton = page.getByRole('button', { name: 'Estimate shipping' });
        this.orderSummary = page.locator('table.cart-total');
        this.cartQty = page.locator('span.cart-qty');
        this.emptyCartMessage = page.locator('.order-summary-content');
        
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
            await this.updateCartButton.click();
        }
    }
    async navigateToShoppingCart() {
        await this.page.getByRole('link', { name: 'Shopping cart' }).first().click();
    }

    async verifyCartButtonsVisible() {
        await expect(this.updateCartButton).toBeVisible();
        await expect(this.continueShoppingButton).toBeVisible();
        await expect(this.estimateShippingButton).toBeVisible();
    }

    async verifyItemPrices() {
        await expect(this.page.locator('span.product-subtotal').nth(0)).toContainText('1365.00');
        await expect(this.page.locator('span.product-subtotal').nth(1)).toContainText('1060.00');
        await expect(this.page.locator('span.product-subtotal').nth(2)).toContainText('1590.00');
    }

    async verifyOrderTotals() {
        await expect(this.orderSummary).toContainText('Sub-Total: 4015.00');
        await expect(this.orderSummary).toContainText('Shipping: 0.00');
        await expect(this.orderSummary).toContainText('Tax: 0.00');
        await expect(this.orderSummary).toContainText('Total: 4015.00');
    }
    
    async verifyCartQty(expectedQty: string) {
        await expect(this.cartQty).toHaveText(expectedQty);
    }

    async removeFirstItemAndVerifyQty(productName: string, expectedQty: string) {
        await this.page.locator('tr').filter({ hasText: productName }).locator('input[name="removefromcart"]').check();
        await this.updateCartButton.click();
        await this.verifyCartQty(expectedQty);
    }

    async verifyEmptyCart() {
        await expect(this.cartQty).toHaveText('(0)');
        await expect(this.emptyCartMessage).toContainText('Your Shopping Cart is empty!');
    }

}