export interface ICurrencyResponseRates {
	EUR: number;
	RUB: number;
}

export interface ICurrencyResponse {
	disclaimer: string;
	license: string;
	timestamp: number;
	base: string;
	rates: ICurrencyResponseRates;
}
