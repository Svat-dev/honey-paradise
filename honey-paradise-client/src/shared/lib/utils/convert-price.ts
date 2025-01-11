export function convertPrice(price: number): string {
	if (typeof price === "undefined") return "0";

	const res = price.toLocaleString("en-US", { currency: "RUB", currencyDisplay: "narrowSymbol", style: "currency" });

	return res;
}
