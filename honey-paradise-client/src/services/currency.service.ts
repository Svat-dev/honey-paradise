import { CLIENT_URL } from "@constants/base"
import type { AxiosResponse } from "axios"
import axios from "axios"
import { format } from "date-fns"

import { currencyInstance } from "@/api/instance"

import type {
	ICurrencyResponse,
	TCurrenciesCodes
} from "./types/currency-service.type"

class CurrencyServiceClass {
	private CURRENCY_SYMBOLS: TCurrenciesCodes[] = ["EUR", "RUB"]

	async main() {
		const year = new Date().getFullYear()
		const month = new Date().getMonth()

		const date = format(new Date(year, month, 1), "yyyy-MM-dd")

		const res = await currencyInstance.get<
			any,
			AxiosResponse<ICurrencyResponse>
		>(`/historical/${date}.json`, {
			params: { symbols: this.CURRENCY_SYMBOLS.join(",") }
		})

		return res
	}

	async getAll() {
		const res = await axios.get<any, AxiosResponse<ICurrencyResponse>>(
			CLIENT_URL! + "/api/currencies"
		)

		return res
	}
}

export const currencyService = new CurrencyServiceClass()
