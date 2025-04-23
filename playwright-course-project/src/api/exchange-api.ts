import { apiConfig } from '../config/api-config';
import { APIRequestContext } from '@playwright/test';
import { CurrencyRatesDto, CurrencyRate } from '../models/currencie-dto';

export class ExchangeApi {
    public constructor(private readonly request: APIRequestContext) {}

    public async getLatestRates(currency?: string): Promise<CurrencyRatesDto> {
        currency = currency || 'usd';
        const fileName = `${currency}.json`;
        const baseUrl = apiConfig.baseUrl;
        const url = `${baseUrl}/${fileName}`;
        const response = await this.request.get(url);
        const body = await response.json();

        const rates = body[currency];
        if (!rates) {
            throw new Error(`${currency.toUpperCase()} rates are missing in response`);
        }

        return {
            date: body.date,
            [currency]: this.convertRatesToArray(rates)
        } as CurrencyRatesDto;
    }

    private convertRatesToArray(rates: Record<string, number>): CurrencyRate[] {
        return Object.entries(rates).map(([key, value]: [string, number]): CurrencyRate => ({ key, value }));
    }

}
