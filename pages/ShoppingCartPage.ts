import { Page, Locator, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export class ShoppingPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly cartTableRows: Locator;
    readonly updateCartButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly estimateShippingButton: Locator;
    readonly orderSummary: Locator;
    readonly cartQty: Locator;
    readonly emptyCartMessage: Locator;

    // Mini Cart Locators
    readonly miniCartTrigger: Locator;
    readonly miniCart: Locator;
    readonly miniCartCount: Locator;
    readonly miniCartItems: Locator;
    readonly miniCartSubtotal: Locator;
    readonly goToCartLink: Locator;

    // Final Total Locator
    readonly subtotalRow: Locator;
    readonly finalTotalRow: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchInput = page.locator('#small-searchterms');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.cartTableRows = page.locator('table.cart tr.cart-item-row');
        this.updateCartButton = page.getByRole('button', { name: 'Update shopping cart' });
        this.continueShoppingButton = page.getByRole('button', { name: 'Continue shopping' });
        this.estimateShippingButton = page.getByRole('button', { name: 'Estimate shipping' });
        this.orderSummary = page.locator('table.cart-total');
        this.cartQty = page.locator('span.cart-qty');
        this.emptyCartMessage = page.locator('.order-summary-content');

        // Mini Cart
        this.miniCartTrigger = page.locator('div.header-links a.ico-cart').first();
        this.miniCart = page.locator('.flyout-cart');
        this.miniCartCount = page.locator('.mini-shopping-cart .count');
        this.miniCartItems = page.locator('.mini-shopping-cart .items .item');
        this.miniCartSubtotal = page.locator('.mini-shopping-cart .totals');
        this.goToCartLink = page.locator('.mini-shopping-cart input.cart-button');

        // Sub-Total Row
        //this.subtotalRow = this.orderSummary.locator('tr:has(td.cart-total-left:text-is("Sub-Total:"))');
        this.subtotalRow = this.orderSummary.getByText('Sub-Total:', { exact: true }).locator('xpath=ancestor::tr[1]');

        // Final Total Row
        this.finalTotalRow = this.orderSummary.getByText('Total:', { exact: true }).locator('xpath=ancestor::tr[1]');
        //this.finalTotalRow = this.orderSummary.locator('tr:has(td.cart-total-left:text-is("Total:"))');
    }

    // Convert displayed price into cents
    private parsePrice(priceText: string): number {
        const amount = Number(
            priceText.replace(/[^0-9.-]/g, '')
        );

        expect(Number.isFinite(amount)).toBeTruthy();

        return Math.round(amount * 100);
    }

    // Clear all items from shopping cart
    async clearcartlist() {
        const homePage = new HomePage(this.page);
        await homePage.clickShopping();

        // Check the items and clear
        const cartlistitems = await this.cartTableRows.all();

        if (cartlistitems.length > 0) {
            for (const item of cartlistitems) {
                await item.locator('td.remove-from-cart input[type="checkbox"]').check();
            }
            await this.page.getByRole('button', { name: 'Update shopping cart' }).click();
        }
    }

    // Navigate to shopping cart
    async navigateToShoppingCart() {
        await this.page.getByRole('link', { name: 'Shopping cart' }).first().click();

        await expect(this.page.locator('.page-title')).toContainText('Shopping cart');
    }

    // Get current cart row count
    async getCartRowCount(): Promise<number> {
        return await this.cartTableRows.count();
    }

    async removeProductAndVerifyRows(productName: string, expectedRowCount: number) {
        const currentRowCount = await this.getCartRowCount();

        expect(currentRowCount).toBeGreaterThan(0);

        await this.cartTableRows.filter({ hasText: productName }).locator('input[name="removefromcart"]').check();

        await this.updateCartButton.click();

        await expect(this.cartTableRows).toHaveCount(expectedRowCount);
    }

    // Remove all products one by one and verify
    async removeAllProductsAndVerify() {
        const initialRowCount = await this.getCartRowCount();

        expect(initialRowCount).toBeGreaterThan(0);

        for (let i = initialRowCount; i > 0; i--) {
            const productName = await this.cartTableRows.first().locator('.product-name').innerText();

            await this.removeProductAndVerifyRows(productName, i - 1);
        }

        await this.verifyEmptyCart();
    }
    // Verify Mini Cart Hover
    async verifyMiniCart() {
        // Hover Shopping Cart
        await this.miniCartTrigger.hover();

        // Verify Mini Cart Visible
        await expect(this.miniCart).toBeVisible();

        // Verify Cart Item Count
        await expect(this.miniCartCount).toContainText(`There are 3 item(s) in your cart`);

        // Verify Mini Cart Products
        const itemCount = await this.miniCartItems.count();

        expect(itemCount).toBeGreaterThan(0);

        for (let i = 0; i < itemCount; i++) {
            const item = this.miniCartItems.nth(i);

            await expect(item.locator('.product .name')).toBeVisible();
            await expect(item.locator('.product .price')).toBeVisible();
            await expect(item.locator('.product .quantity')).toBeVisible();
        }

        // Verify Subtotal
        await expect(this.miniCartSubtotal).toBeVisible();

        // Verify Go To Cart Button
        await expect(this.goToCartLink).toBeVisible();
    }

    // Click Go To Cart from Mini Cart
    async clickGoToCart() {
        await this.miniCartTrigger.hover();
        await expect(this.miniCart).toBeVisible();
        await this.goToCartLink.click();
        await expect(this.page).toHaveURL(/cart/);
        await expect(this.page.locator('.page-title')).toContainText('Shopping cart');
    }

    // Calculate total from all cart rows
    async calculateCartTotal(): Promise<number> {
        const rowCount = await this.cartTableRows.count();

        let expectedTotalInCents = 0;

        for (let i = 0; i < rowCount; i++) {
            const subtotalText = await this.cartTableRows.nth(i).locator('span.product-subtotal').innerText();
            expectedTotalInCents += this.parsePrice(subtotalText);
        }

        return expectedTotalInCents / 100;
    }

    private async getSummaryAmount(label: string): Promise<number> {
        const row = this.orderSummary.getByText(label, { exact: true }).locator('xpath=ancestor::tr[1]');

        if (await row.count() === 0) {
            return 0;
        }

        const amountText = await row.locator('td.cart-total-right').innerText();

        return this.parsePrice(amountText);
    }
    // Verify all cart item prices dynamically
    async verifyItemPrices() {
        const rowCount = await this.cartTableRows.count();

        expect(rowCount).toBeGreaterThan(0);

        for (let i = 0; i < rowCount; i++) {
            const subtotal = this.cartTableRows.nth(i).locator('span.product-subtotal');

            await expect(subtotal).toBeVisible();

            const priceText = await subtotal.innerText();

            expect(this.parsePrice(priceText)).toBeGreaterThan(0);
        }
    }

    // Verify Cart Order Totals
    async verifyOrderTotals() {

        // Calculate total from all cart rows
        const expectedTotal = await this.calculateCartTotal();

        // Verify Sub-Total Row
        await expect(this.subtotalRow).toBeVisible();

        const subtotalText = await this.subtotalRow.locator('td.cart-total-right').innerText();

        const actualSubtotal = this.parsePrice(subtotalText);

        expect(actualSubtotal).toBe(Math.round(expectedTotal * 100));

        // Verify Shipping
        await expect(this.orderSummary).toContainText('Shipping:');

        // Verify Tax
        await expect(this.orderSummary).toContainText('Tax:');

        // Verify Final Total Row
        await expect(this.finalTotalRow).toBeVisible();

        const totalText = await this.finalTotalRow.locator('td.cart-total-right').innerText();

        const actualTotal = this.parsePrice(totalText);

        // Compare calculated cart total with displayed Final Total
        expect(actualTotal).toBe(Math.round(expectedTotal * 100));
    }

    // Verify Cart Buttons
    async verifyCartButtonsVisible() {
        await expect(this.updateCartButton).toBeVisible();
        await expect(this.continueShoppingButton).toBeVisible();
        await expect(this.estimateShippingButton).toBeVisible();
    }

    // Verify Cart Page
    async verifyCartPage() {
        await expect(this.page.locator('.page-title')).toContainText('Shopping cart');
        await expect(this.cartTableRows.first()).toBeVisible();
        await this.verifyCartButtonsVisible();
        await this.verifyItemPrices();
        await this.verifyOrderTotals();
    }

    // Verify Cart Quantity
    async verifyCartQty(expectedQty: string) {
        await expect(this.cartQty).toHaveText(expectedQty);
    }

    // Remove first item and verify quantity
    async removeFirstItemAndVerifyQty(productName: string, expectedQty: string) {
        await this.cartTableRows.filter({ hasText: productName }).locator('input[name="removefromcart"]').check();
        await this.updateCartButton.click();
        await this.verifyCartQty(expectedQty);
    }

    // Verify Empty Cart
    async verifyEmptyCart() {
        await expect(this.cartQty).toHaveText('(0)');
        await expect(this.emptyCartMessage).toContainText('Your Shopping Cart is empty!');
    }
}