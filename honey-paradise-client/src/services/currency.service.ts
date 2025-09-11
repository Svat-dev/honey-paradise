import { currencyInstance } from "@/api/instance";
import { CLIENT_URL } from "@constants/base";
import type { AxiosResponse } from "axios";
import axios from "axios";
import { format } from "date-fns";
import type { ICurrencyResponse } from "./types/currency-service.type";

class CurrencyServiceClass {
	private CURRENCY_SYMBOLS = ["EUR", "RUB"];

	async main() {
		const year = new Date().getFullYear();
		const month = new Date().getMonth();

		const date = format(new Date(year, month, 1), "yyyy-MM-dd");

		const res = await currencyInstance.get<any, AxiosResponse<ICurrencyResponse>>(`/historical/${date}.json`, {
			params: { symbols: this.CURRENCY_SYMBOLS.join(",") },
		});

		return res;
	}

	async getAll() {
		const res = await axios.get<any, AxiosResponse<string>>(CLIENT_URL! + "/api/currencies");

		return JSON.parse(res.data) as ICurrencyResponse | null;
	}
}

export const currencyService = new CurrencyServiceClass();
