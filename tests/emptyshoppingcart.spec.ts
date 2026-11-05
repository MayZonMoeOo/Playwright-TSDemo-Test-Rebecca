import { test, expect } from '@playwright/test';
import { VALID_USER } from '../data/Data';
import { HomePage } from '../pages/HomePage';
import { LoginPage} from '../pages/LoginPage';
import { WishlistPage } from '../pages/WhislistPage';
import { ShoppingPage } from '../pages/ShoppingCartPage';

test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser(VALID_USER.email,VALID_USER.password);
});

test.only("Empty Shopping Cart",async ({page}) => {
        const homePage = new HomePage(page);
        const wishlistPage = new WishlistPage(page);
        const cartlistPage = new ShoppingPage(page);
        
        // Clear the items from Shopping before add shopping item
        await cartlistPage.clearcartlist();
        // Clear the items from Wishlist before add wishlist item
        await wishlistPage.clearWishlist();

    await page.getByRole('link', { name: 'Computers' }).first().hover();
    await page.getByRole('link', { name: 'Desktops' }).click();
    await page.locator('#products-pagesize').selectOption('4');

    await page.getByRole('link', { name: '- 1200.00' }).click();
    await page.getByRole('link', { name: 'Remove Filter' }).click();
    await page.getByRole('link', { name: 'Desktops' }).first().click();    
    await page.getByRole('link', { name: 'Build your own computer', exact: true }).click();
    await page.getByRole('listitem').filter({ hasText: 'GB [+100.00]' }).click();
  await page.getByRole('radio', { name: 'GB [+100.00]' }).check();
    await page.locator('#add-to-cart-button-16').click();
    await page.getByRole('link', { name: 'Desktops' }).first().click();
    await page.getByRole('link', { name: 'Build your own cheap computer', exact: true }).click();
    await page.getByRole('radio', { name: 'Fast [+100.00]' }).check();
    await page.getByRole('radio', { name: 'GB [+60.00]' }).check();
    await page.getByRole('checkbox', { name: 'Office Suite [+100.00]' }).check();
    await page.locator('#add-to-cart-button-72').click();
    await page.getByRole('link', { name: 'Notebooks' }).first().click();
    await page.getByRole('link', { name: '14.1-inch Laptop', exact: true }).click();
    await page.locator('#add-to-cart-button-31').click();
    await page.getByRole('link', { name: 'Jewelry' }).first().click();
    await page.locator('#products-pagesize').selectOption('4');
    await page.getByRole('link', { name: 'Black & White Diamond Heart', exact: true }).click();
    await page.getByRole('button', { name: 'Add to wishlist' }).click();
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('link', { name: 'Wishlist' }).first().click();

    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.locator('tr:has-text("Build your own computer")').locator('.product-subtotal').click();    
    await page.locator('tr:has-text("Build your own cheap computer")').locator('.product-subtotal').click();
    await page.locator('tr:has-text("14.1-inch Laptop")').locator('.product-subtotal').click();


    //Verify Update shopping cart button display or not
    await expect(page.getByRole('button', { name: 'Update shopping cart' })).toBeVisible();

    //Verify Continue shopping button display or not
    await expect(page.getByRole('button', { name: 'Continue shopping' })).toBeVisible();

    //Verify Estimate shipping button display or not
    await expect(page.getByRole('button', { name: 'Estimate shipping' })).toBeVisible();

    //Verify item price
    await expect(page.locator('span.product-subtotal').nth(0)).toContainText('1365.00');
    await expect(page.locator('span.product-subtotal').nth(1)).toContainText('1060.00');
    await expect(page.locator('span.product-subtotal').nth(2)).toContainText('1590.00');

    // Verify order totals before confirmation
    const orderSummary = page.locator('table.cart-total');
    await expect(orderSummary).toContainText('Sub-Total: 4015.00');
    await expect(orderSummary).toContainText('Shipping: 0.00');
    await expect(orderSummary).toContainText('Tax: 0.00');
    await expect(orderSummary).toContainText('Total: 4015.00');

    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    //Verify item count
    await expect(page.locator('span.cart-qty')).toHaveText('(3)'); 


    //Delete the first item on shopping cart
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('row', { name: 'Picture of Build your own computer' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Update shopping cart' }).click();

    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    //Verify item count
    await expect(page.locator('span.cart-qty')).toHaveText('(2)'); 


    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('row', { name: 'Picture of Build your own cheap computer' }).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Update shopping cart' }).click();
    
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    //Verify item count
    await expect(page.locator('span.cart-qty')).toHaveText('(1)'); 

    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.locator('tr').filter({ hasText: '14.1-inch Laptop' }).locator('input[name="removefromcart"]').check();
    await page.getByRole('button', { name: 'Update shopping cart' }).click();
    
    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    //Verify item count
    await expect(page.locator('span.cart-qty')).toHaveText('(0)');

    await page.getByRole('link', { name: 'Shopping cart' }).first().click();
    await page.getByRole('link', { name: 'Log out' }).click();


});
