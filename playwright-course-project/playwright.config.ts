import { defineConfig } from '@playwright/test';
import './tests/setup';

export default defineConfig({
    testDir: './tests',
    use: {
        baseURL: 'https://www.fophelp.pro/',
        browserName: 'chromium',
        headless: true,
        screenshot: 'only-on-failure',
        video: 'retain-on-failure'
    },
    reporter: [
        ['list'],
        ['allure-playwright']
    ]
});
