import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import { ExpensesPage } from '@pages/expenses-page';
import dotenv from 'dotenv';

dotenv.config();

const email = process.env.TEST_EMAIL!;
const password = process.env.TEST_PASSWORD!;

test('Add Expenses', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(email, password);

    const expensesPage = new ExpensesPage(page);
    await expensesPage.goto();

    const today = new Date().toISOString().split('T')[0];
    const comment = 'Expenses ' + Date.now();

    await expensesPage.addExpense(today, '350.75', 'USD', comment, false);

    const rows = expensesPage.getRowsByComment(comment);
    await expect(rows).toHaveCount(1);
});
