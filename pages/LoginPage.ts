import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly email: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessages: Locator;
  readonly welcomeHeading: Locator;


  constructor(page: Page) {
    this.page = page;

    this.email = page.getByRole('textbox', { name: 'Email:' });
    this.password = page.getByRole('textbox', { name: 'Password:' });

    this.loginButton = page.getByRole('button', { name: 'Log in' });
    
    this.errorMessages = page.locator('div.validation-summary-errors');
    this.welcomeHeading = page.getByRole('heading', { name: 'Welcome to our store' });
  }

  async loginUser(email: string, pass: string) {
    await this.email.fill(email);
    await this.password.fill(pass);
    await this.loginButton.click();


  }
}


