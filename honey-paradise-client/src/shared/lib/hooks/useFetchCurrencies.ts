import { useQuery } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { useEffect } from "react"

import { currencyService } from "@/services/currency.service"
import { currenciesFetchStore } from "@/shared/store/currencies-fetch.store"

import { EnumStorageKeys } from "../constants/base"

export const useFetchCurrencies = () => {
	const setStateData = currenciesFetchStore(state => state.setData)

	const cookie = Cookies.get(EnumStorageKeys.CURRENCY_DATA)

	const { data } = useQuery({
		queryKey: ["currencies"],
		queryFn: () => currencyService.getAll(),
		enabled: !cookie
	})

	useEffect(() => {
		if (data?.data && !cookie) {
			const year = new Date().getFullYear()
			const month = new Date().getMonth()

			setStateData(data.data)
			Cookies.set(EnumStorageKeys.CURRENCY_DATA, JSON.stringify(data.data), {
				expires: new Date(year, month + 1, 1)
			})

			return
		} else {
			if (cookie) return setStateData(JSON.parse(cookie))
		}
	}, [data?.data, cookie])

	return true
}
