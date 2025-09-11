export interface ICurrencyResponseRates {
	EUR: number;
	RUB: number;
}

export type TCurrenciesCodes = "USD" | "EUR" | "RUB";

export interface ICurrencyResponse {
	disclaimer: string;
	license: string;
	timestamp: number;
	base: string;
	rates: ICurrencyResponseRates;
}
