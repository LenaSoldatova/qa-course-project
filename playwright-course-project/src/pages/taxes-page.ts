import { Page, Locator } from '@playwright/test';

export class TaxesPage {
    private readonly page: Page;

    public constructor(page: Page) {
        this.page = page;
    }

    public async goto(): Promise<void> {
        await this.page.goto('/Taxes');
    }

    public async getAzurePeriodId(): Promise<string | null> {
        const notPayedSection = this.page.locator('#partial-content-tax-notpayed');
        const azureRow = notPayedSection.locator('tr[style*="background-color:azure"]');
        const periodCell = azureRow.locator('td');
        const periodText = await periodCell.innerText();
        const match = periodText.match(/\d{4}-\d/);
        return match?.[0] ?? null;
    }

    public async clickPayButton(periodId: string): Promise<void> {
        const payButton = this.page.locator(`#pay-${periodId}`);
        await payButton.click();
    }

    public async getEditButton(): Promise<Locator> {
        const paidSection = this.page.locator('#partial-content-tax-payed');
        return paidSection.locator('.button-table.button-modify').first();
    }

    public getNotPayedSection(): Locator {
        return this.page.locator('#partial-content-tax-notpayed');
    }

    public getPaidSection(): Locator {
        return this.page.locator('#partial-content-tax-payed');
    }

    public getPayButton(periodId: string): Locator {
        return this.page.locator(`#pay-${periodId}`);
    }
}
