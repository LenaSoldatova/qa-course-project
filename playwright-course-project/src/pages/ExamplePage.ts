import { Page, Locator, expect } from '@playwright/test';

export class ExamplePage {
  readonly page: Page;
  readonly title: Locator;
  readonly link: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('h1.display-4');
    this.link = this.title.locator('a[href="https://www.fophelp.pro"]');
  }

  async checkTitleAndLink() {
    await expect(this.title).toContainText('Вітаємо на сайті');
    await expect(this.link).toHaveText('FopHelp.pro');
    await expect(this.link).toHaveAttribute('href', 'https://www.fophelp.pro');
  }
}
