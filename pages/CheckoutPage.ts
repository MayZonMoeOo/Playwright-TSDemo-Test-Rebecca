import { Page, Locator } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

export class CheckoutPage {
  readonly page: Page;
  readonly termsCheckbox: Locator;
  readonly checkoutButton: Locator;
  readonly continueButton: Locator;
  readonly confirmButton: Locator;
  readonly orderDetailsLink: Locator;
  readonly cartTableRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.termsCheckbox = page.locator('#termsofservice');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.orderDetailsLink = page.getByRole('link', { name: 'Click here for order details.' });
    this.cartTableRows = page.locator('table.cart').locator('tr.cart-item-row');
  }

  // Clear the items from Cart
    async clearCart() {
    // Go to cart
    const homePage = new HomePage(this.page);
    await homePage.clickShopping();

  // Check the items and clear
    const cartitems = await this.cartTableRows.all();

    if (cartitems.length > 0) {
      for (const item of cartitems) {
        await item.locator('td.remove-from-cart input[type="checkbox"]').click();
      }
      await this.page.getByRole('button', { name: 'Update shopping cart' }).click();
    }
  }

  // Desktop product options selection & add to cart
    async addCustomDesktopToCart() {
    await this.page.getByRole('link', { name: 'Computers' }).first().hover();
    await this.page.getByRole('link', { name: 'Desktops' }).click();
    await this.page.getByRole('button', { name: 'Add to cart' }).nth(2).click();
    await this.page.getByRole('radio', { name: 'Fast [+100.00]' }).check();
    await this.page.getByRole('radio', { name: '8GB [+60.00]' }).check();
    await this.page.getByRole('checkbox', { name: 'Office Suite [+100.00]' }).check();
    await this.page.locator('#add-to-cart-button-74').click();
  }
  // Choose Notebook and add to cart
  async addNotebookToCart() {
    await this.page.getByRole('link', { name: 'Computers' }).first().hover();
    await this.page.getByRole('link', { name: 'Notebooks' }).first().click();
    await this.page.getByRole('button', { name: 'Add to cart' }).click();
  }

  // Complete checkout steps
    async proceedCheckout() {
    await this.termsCheckbox.check();
    await this.checkoutButton.click();
    
  }

  // Order confirm
    async confirmOrder() {
    await this.continueButton.click();
    await this.orderDetailsLink.click();
  }

}