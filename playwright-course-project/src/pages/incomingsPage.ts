import { Page, Locator, expect } from '@playwright/test';

export class IncomingsPage {
  readonly page: Page;
  readonly dateInput: Locator;
  readonly incomeInput: Locator;
  readonly currencySelect: Locator;
  readonly commentInput: Locator;
  readonly cashCheckbox: Locator;
  readonly addButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dateInput = page.locator('#inc-date');
    this.incomeInput = page.locator('#inc-value');
    this.currencySelect = page.locator('#inc-currency');
    this.commentInput = page.locator('#inc-comment');
    this.cashCheckbox = page.locator('#inc-cash');
    this.addButton = page.getByRole('button', { name: 'Додати' });
  }

  async goto() {
    await this.page.goto('/Incomings/');
  }

  async addIncome(date: string, value: string, currency: string, comment: string, isCash: boolean) {
    await this.dateInput.fill(date);
    await this.incomeInput.fill(value);
    await this.currencySelect.selectOption({ label: currency });
    await this.commentInput.fill(comment);
    if (isCash) {
      await this.cashCheckbox.check();
    }
    await this.addButton.click();
  }

  async getIncomeTotal(): Promise<number> {
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
  

  async expectIncomeAppeared(value: string) {
    await expect(this.page.locator('table')).toContainText(value);
  }
}
