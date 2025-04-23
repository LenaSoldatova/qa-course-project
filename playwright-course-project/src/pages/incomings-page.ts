import { Page, Locator, expect } from '@playwright/test';

export class IncomingsPage {
    private readonly page: Page;
    private readonly dateInput: Locator;
    private readonly incomeInput: Locator;
    private readonly currencySelect: Locator;
    private readonly commentInput: Locator;
    private readonly cashCheckbox: Locator;
    private readonly addButton: Locator;

    public constructor(page: Page) {
        this.page = page;
        this.dateInput = page.locator('#inc-date');
        this.incomeInput = page.locator('#inc-value');
        this.currencySelect = page.locator('#inc-currency');
        this.commentInput = page.locator('#inc-comment');
        this.cashCheckbox = page.locator('#inc-cash');
        this.addButton = page.getByRole('button', { name: 'Додати' });
    }

    public async goto(): Promise<void> {
        await this.page.goto('/Incomings/');
    }

    public async addIncome(date: string, value: string, currency: string, comment: string, isCash: boolean): Promise<void> {
        await this.dateInput.fill(date);
        await this.incomeInput.fill(value);
        await this.currencySelect.selectOption({ label: currency });
        await this.commentInput.fill(comment);
        if (isCash) {
            await this.cashCheckbox.check();
        }
        await this.addButton.click();
    }

    public async getIncomeTotal(): Promise<number> {
        const rows = this.page.locator('table tbody tr');
        const count = await rows.count();
        let total = 0;

        for (let i = 0; i < count; i++) {
            const amountText = await rows.nth(i).locator('td').nth(2).textContent();
            const cleaned = amountText?.replace(/\s/g, '').replace(',', '.');
            const amount = parseFloat(cleaned || '0');
            //console.log(`Income text for row ${i}: ${amountText} → ${amount}`);
            total += amount;
        }

        return total;
    }


    public async expectIncomeAppeared(value: string): Promise<void> {
        await expect(this.page.locator('table')).toContainText(value);
    }
}
