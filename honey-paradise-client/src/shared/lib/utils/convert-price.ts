import type { TCurrenciesCodes } from "@/services/types/currency-service.type";
import type { GetMySettingsResponseDefaultCurrency } from "@/shared/types/server";

export function convertPrice(price: number, currency: string, round: boolean = false): string {
	if (typeof price === "undefined") return "0";

	const roundPrice = round ? Math.round(price) : price;

	const res = roundPrice.toLocaleString("en-US", { currency, currencyDisplay: "narrowSymbol", style: "currency" });

	return res;
}

export function getCurrencyFromSettings(currency: GetMySettingsResponseDefaultCurrency): TCurrenciesCodes {
	switch (currency) {
		case "DOLLAR":
			return "USD";

		case "EURO":
			return "EUR";

		case "RUBLE":
			return "RUB";

		default:
			return "USD";
	}
}
