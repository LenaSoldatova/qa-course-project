import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly validationError: Locator;
  readonly welcomeTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('#Input_Email');
    this.passwordInput = page.locator('#Input_Password');
    this.loginButton = page.getByRole('button', { name: 'Увійти' });
    this.validationError = page.locator('.validation-summary-errors li');
    this.welcomeTitle = page.locator('h1.display-4');
  }

  async goto() {
    await this.page.goto('/Identity/Account/Login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectPasswordRequiredError() {
    await expect(this.validationError).toContainText('Пароль');
  }

  async expectSuccessfulLogin() {
    await expect(this.welcomeTitle).toHaveText(/Вітаємо на сайті/i);
  }
}
