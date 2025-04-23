import { test, expect } from '@playwright/test';
import { LoginPage } from '@pages/login-page';
import { IncomingsPage } from '@pages/incomings-page';
import { ExpensesPage } from '@pages/expenses-page';
import { TaxesPage } from '@pages/taxes-page';
import { ReportingPage } from '@pages/reporting-page';
import dotenv from 'dotenv';

dotenv.config();

test('E2E test: add Incomings, add Expenses, post tax, check reporting', async ({ page }) => {
    const email = process.env.TEST_EMAIL!;
    const password = process.env.TEST_PASSWORD!;
    const today = new Date().toISOString().split('T')[0];
    const incomeValue = '1234.56';
    const expenseValue = '654.32';
    const comment = 'autotest-' + Date.now();

    await test.step('Login with valid credentials', async () => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login(email, password);
    });

    await test.step('Add income record', async () => {
        const incomingsPage = new IncomingsPage(page);
        await incomingsPage.goto();
        await incomingsPage.addIncome(today, incomeValue, 'USD', comment, true);
        await incomingsPage.expectIncomeAppeared(incomeValue.replace('.', ','));
    });

    await test.step('Add expense record', async () => {
        const expensesPage = new ExpensesPage(page);
        await expensesPage.goto();
        await expensesPage.addExpense(today, expenseValue, 'USD', comment, false);
    });

    await test.step('Submit taxes', async () => {
        const taxesPage = new TaxesPage(page);
        await taxesPage.goto();
        await expect(taxesPage.getNotPayedSection()).toBeVisible({ timeout: 10000 });

        const periodId = await taxesPage.getAzurePeriodId();
        expect(periodId).not.toBeNull();

        const payButton = taxesPage.getPayButton(periodId!);
        await expect(payButton).toBeVisible({ timeout: 5000 });
        await taxesPage.clickPayButton(periodId!);

        const editButton = await taxesPage.getEditButton();
        await expect(editButton).toBeVisible({ timeout: 10000 });
    });

    await test.step('Check that today is included in reporting period', async () => {
        const reportingPage = new ReportingPage(page);
        await reportingPage.goto();

        const { from, to } = await reportingPage.getReportingPeriod();
        const [year, month] = today.split('-');
        const todayPeriod = `${year}-${parseInt(month, 10)}`;
        expect(todayPeriod >= from && todayPeriod <= to).toBeTruthy();
    });
});
