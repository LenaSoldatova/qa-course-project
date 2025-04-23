import { test } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.TEST_EMAIL || 'default@example.com';
const password = process.env.TEST_PASSWORD || 'defaultPassword';

test('Should show error if password is empty', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await test.step('Navigate to login page', async () => {
        await loginPage.goto();
    });

    await test.step('Try to login with empty password', async () => {
        await loginPage.login(email, '');
    });

    await test.step('Check for password required validation error', async () => {
        await loginPage.expectPasswordRequiredError();
    });
});

test('Should login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Navigate to login page', async () => {
        await loginPage.goto();
    });

    await test.step('Fill in valid credentials and login', async () => {
        await loginPage.login(email, password);
    });

    await test.step('Check if welcome title is visible after login', async () => {
        await loginPage.expectSuccessfulLogin();
    });
});
