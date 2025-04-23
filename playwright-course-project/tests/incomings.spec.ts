import { test } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import { IncomingsPage } from '@pages/incomings-page';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.TEST_EMAIL!;
const password = process.env.TEST_PASSWORD!;

test('Add new income entry', async ({ page }) => {
    // Step 1: Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);

    // Step 2: Navigate to the Incomings page
    const incomingsPage = new IncomingsPage(page);
    await incomingsPage.goto();

    // Step 3: Fill in the income form
    const today = new Date().toISOString().split('T')[0]; // format yyyy-mm-dd
    await incomingsPage.addIncome(today, '5000', 'USD', 'Test income', true);

    // Step 4: Verify that the income amount appears in the table
    await incomingsPage.expectIncomeAppeared('5000');
});
