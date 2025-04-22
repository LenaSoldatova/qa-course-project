import { test } from '@playwright/test';
import { ExamplePage } from '@pages/ExamplePage';

test('Проверка заголовка и ссылки', async ({ page }) => {
  await page.goto('/');
  const examplePage = new ExamplePage(page);
  await examplePage.checkTitleAndLink();
});
