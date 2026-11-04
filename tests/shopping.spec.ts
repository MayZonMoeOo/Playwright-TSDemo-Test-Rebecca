import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { RegisterPage } from '../pages/RegisterPage';

test.beforeEach(async ({page}) => {
    const homePage = new HomePage(page);
    const loginPage = new LoginPage(page);

    await homePage.goto();
    await homePage.clickLogin();    
    await loginPage.loginUser('rebecca.oo@yopmail.com','grapeseed@123');
});

test.only("Purchase Desktop and Notebook", async ({ page }) => {
    await page.getByRole('link', { name: 'Computers' }).first().hover();
    await page.getByRole('link', { name: 'Desktops' }).click();
    await page.locator('#products-pagesize').selectOption('4');
    await page.waitForTimeout(5000); // Wait 5 seconds

    let ProductDetails = '';
    const displayProducts = await page.locator('div.product-grid').locator('div.product-item').all();
    if (displayProducts.length > 0) {
        for (const product of displayProducts) {
            ProductDetails += await product.locator('h2.product-title').textContent() || '';
            ProductDetails += await product.locator('div.prices').textContent() || '';
        }
    }

    await expect(displayProducts.length).toBe(4);
    await expect(ProductDetails).toContain('Build your own cheap computer');
    await expect(ProductDetails).toContain('800.00');
    await expect(ProductDetails).toContain('Build your own computer');
    await expect(ProductDetails).toContain('1200.00');
    await expect(ProductDetails).toContain('Build your own expensive computer');
    await expect(ProductDetails).toContain('1800.00');
    await expect(ProductDetails).toContain('Desktop PC with CDRW');
    await expect(ProductDetails).toContain('500.00');
});

