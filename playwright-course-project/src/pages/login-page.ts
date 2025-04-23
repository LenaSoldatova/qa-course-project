import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    private readonly page: Page;
    private readonly emailInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly validationError: Locator;
    private readonly welcomeTitle: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#Input_Email');
        this.passwordInput = page.locator('#Input_Password');
        this.loginButton = page.getByRole('button', { name: 'Увійти' });
        this.validationError = page.locator('.validation-summary-errors li');
        this.welcomeTitle = page.locator('h1.display-4');
    }

    public async goto(): Promise<void> {
        await this.page.goto('/Identity/Account/Login');
    }

    public async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    public async expectPasswordRequiredError(): Promise<void> {
        await expect(this.validationError).toContainText('Пароль');
    }

    public async expectSuccessfulLogin(): Promise<void> {
        await expect(this.welcomeTitle).toHaveText(/Вітаємо на сайті/i);
    }
}
