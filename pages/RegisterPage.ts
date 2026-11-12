import { Page, Locator } from '@playwright/test';

export class RegisterPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly password: Locator;
    readonly confirmPassword: Locator;
    readonly registerButton: Locator;
    readonly resultMessage: Locator;
    readonly continueButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByRole('textbox', { name: 'First name:' });
        this.lastName = page.getByRole('textbox', { name: 'Last name:' });
        this.email = page.getByRole('textbox', { name: 'Email:' });
        this.password = page.getByRole('textbox', { name: 'Password:', exact: true });
        this.confirmPassword = page.getByRole('textbox', { name: 'Confirm password:' });
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.resultMessage = page.locator('div.result');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.errorMessage = page.locator('div.validation-summary-errors');
    }
    async registerUser(gender: 'Male' | 'Female', firstName: string, lastName: string, email: string, pass: string) {
        await this.page.getByRole('radio', { name: gender, exact: true }).check();

        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.password.fill(pass);
        await this.confirmPassword.fill(pass);
        await this.registerButton.click();
    }

    async clickContinue() {
        await this.continueButton.click();
    }
}
