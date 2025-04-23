import { Locator, Page } from '@playwright/test';

export class ReportingPage {
    private readonly azurePeriodCell: Locator;

    public constructor(private page: Page) {
        this.azurePeriodCell = this.page.locator('tr[style="background-color:azure"] td[colspan="7"]');
    }

    public async goto(): Promise<void> {
        await this.page.goto('/Reporting');
    }

    public async getReportingPeriod(): Promise<{ from: string; to: string }> {
        const periodText = await this.azurePeriodCell.innerText();
        const match = periodText.match(/Період з: (\d{4}-\d+) по: (\d{4}-\d+)/);
        if (!match) throw new Error('Cannot find period in the table');
        const [, from, to] = match;
        return { from, to };
    }


}
