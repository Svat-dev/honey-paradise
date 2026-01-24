import type { TCurrenciesCodes } from "@/services/types/currency-service.type"
import { currenciesFetchStore } from "@/shared/store/currencies-fetch.store"
import type { GetMyCartResponseCurrency } from "@/shared/types/server"

import { convertPrice, getCurrencyFromSettings } from "../utils"

/**
 * Функция для получения цены в нужной валюте
 * @param priceInUsd цена в долларах США
 * @param userCurrency валюта пользователя из настроек
 * @returns объект с валютой и функцией получения цены
 */
export const useGetPrice = (userCurrency?: GetMyCartResponseCurrency) => {
	const rates = currenciesFetchStore(state => state.rates)

	const currency: TCurrenciesCodes = userCurrency
		? getCurrencyFromSettings(userCurrency)
		: "USD"

	function getPrice(priceInUsd: number): number
	function getPrice(
		priceInUsd: number,
		convert: boolean,
		round: boolean
	): string
	function getPrice(
		priceInUsd: number,
		convert: boolean = false,
		round: boolean = false
	): any {
		const price =
			currency === "USD" ? priceInUsd : priceInUsd * (rates?.[currency] || 1)

		return convert
			? convertPrice(price, currency, round)
			: round
				? Math.round(price)
				: price
	}

	return { getPrice, currency }
}
