import { Page, Locator } from '@playwright/test';

export class ExpensesPage {
    private readonly page: Page;
    private readonly dateInput: Locator;
    private readonly amountInput: Locator;
    private readonly currencySelect: Locator;
    private readonly commentInput: Locator;
    private readonly cashCheckbox: Locator;
    private readonly addButton: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.dateInput = page.locator('#exp-date');
        this.amountInput = page.locator('#exp-value');
        this.currencySelect = page.locator('#exp-currency');
        this.commentInput = page.locator('#exp-comment');
        this.cashCheckbox = page.locator('input[type="checkbox"]');
        this.addButton = page.getByRole('button', { name: 'Додати' });
    }

    public async goto(): Promise<void> {
        await this.page.goto('/Expenses/');
    }

    public async addExpense(date: string, amount: string, currency: string, comment: string, isCash: boolean): Promise<void> {
        await this.dateInput.fill(date);
        await this.amountInput.fill(amount.replace('.', ','));
        await this.currencySelect.selectOption({ label: currency });
        await this.commentInput.fill(comment);
        if (isCash) {
            await this.cashCheckbox.check();
        }
        await this.addButton.click();
    }

    public getRowsByComment(comment: string): Locator {
        return this.page.locator('table tr', { hasText: comment });
    }

    public getTable(): Locator {
        return this.page.locator('table');
    }

    public async getExpenseTotal(): Promise<number> {
        const rows = this.page.locator('table tbody tr');
        const count = await rows.count();
        let total = 0;

        for (let i = 0; i < count; i++) {
            const amountText = await rows.nth(i).locator('td').nth(2).textContent();
            const cleaned = amountText?.replace(/\s/g, '').replace(',', '.');
            const amount = parseFloat(cleaned || '0');
            //console.log(`Expense text for row ${i}: ${amountText} → ${amount}`);
            total += amount;
        }

        return total;
    }
}
