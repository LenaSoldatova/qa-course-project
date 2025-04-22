// src/pages/ExpensesPage.ts
import { Page, Locator } from '@playwright/test';

export class ExpensesPage {
  readonly page: Page;
  readonly dateInput: Locator;
  readonly amountInput: Locator;
  readonly currencySelect: Locator;
  readonly commentInput: Locator;
  readonly cashCheckbox: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateInput = page.locator('#exp-date');
    this.amountInput = page.locator('#exp-value');
    this.currencySelect = page.locator('#exp-currency');
    this.commentInput = page.locator('#exp-comment');
    this.cashCheckbox = page.locator('input[type="checkbox"]');
    this.addButton = page.getByRole('button', { name: 'Додати' });
  }

  async goto() {
    await this.page.goto('/Expenses/');
  }

  async addExpense(date: string, amount: string, currency: string, comment: string, isCash: boolean) {
    await this.dateInput.fill(date);
    await this.amountInput.fill(amount.replace('.', ','));
    await this.currencySelect.selectOption({ label: currency });
    await this.commentInput.fill(comment);
    if (isCash) {
      await this.cashCheckbox.check();
    }
    await this.addButton.click();
  }

  getRowsByComment(comment: string) {
    return this.page.locator('table tr', { hasText: comment });
  }

  getTable() {
    return this.page.locator('table');
  }

  async getExpenseTotal(): Promise<number> {
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
