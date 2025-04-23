import { test, expect} from '@playwright/test';
import { ExchangeApi } from '../../src/api/exchange-api';
import dotenv from 'dotenv';

dotenv.config();
test('Check EUR in latest USD', async ({ request }) => {
    await test.step('Create API context', async () => {
        const api = new ExchangeApi(request);
        const data = await api.getLatestRates('usd');

        await test.step('Find USD in response', async () => {
            const usdRate = data.usd.find(rate => rate.key === 'eur')?.value;
            expect(usdRate).toBeGreaterThan(0);
        });
    });
});
