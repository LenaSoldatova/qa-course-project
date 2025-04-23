export interface CurrencyRate {
    key: string;
    value: number;
}

export interface CurrencyRatesDto {
    date: string;
    usd: CurrencyRate[];
}
