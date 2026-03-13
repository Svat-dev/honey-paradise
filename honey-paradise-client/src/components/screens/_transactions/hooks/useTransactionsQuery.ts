import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"

import { ISearchFormFields } from "@/components/layouts/-header/hooks/types/use-search.type"
import { useDebounce } from "@/shared/lib/hooks/base"
import { paymentsFilterStore } from "@/shared/store/payments-filter.store"
import { IPaymentFilterStore } from "@/shared/store/types/payments-filter-store.type"
import {
	PaymentsControllerGetAllByUserField,
	PaymentsControllerGetAllByUserType
} from "@/shared/types/server"

export const useTransactionsQuery = () => {
	const pathname = usePathname()
	const searchParams = useSearchParams()
	const { replace } = useRouter()

	const queryParams = paymentsFilterStore(state => state.params)
	const isFilterUpdated = paymentsFilterStore(state => state.isFilterUpdated)
	const reset_store = paymentsFilterStore(state => state.reset)
	const update = paymentsFilterStore(state => state.update)

	function updateQueryParams(key: "status" | "page", value: number): void
	function updateQueryParams(key: "q", value: string): void
	function updateQueryParams(
		key: "type",
		value: PaymentsControllerGetAllByUserType
	): void
	function updateQueryParams(
		key: "field",
		value: PaymentsControllerGetAllByUserField
	): void
	function updateQueryParams(
		key: keyof IPaymentFilterStore["params"],
		value: number | string
	) {
		const params = new URLSearchParams(searchParams.toString())

		let newValue: string = String(value)
		if (key === "status" && typeof value === "number") {
			let prevStatus = queryParams.status

			if (prevStatus.includes(value))
				prevStatus = prevStatus.filter(i => i !== value)
			else prevStatus.push(value)

			newValue = prevStatus.sort().map(String).join(",")
		}

		if (newValue) params.set(key, newValue)
		else params.delete(key)

		replace(pathname + `?${params.toString()}`, { scroll: false })
		update({
			[key]: key === "status" ? newValue.split(",").map(Number) : newValue
		})
	}

	const reset = () => {
		if (!isFilterUpdated) return

		reset_store()
		replace(pathname)
	}

	useEffect(() => {
		searchParams.forEach((value, key: any) => {
			updateQueryParams(key, value)
		})
	}, [])

	return useMemo(
		() => ({
			queryParams,
			isFilterUpdated,
			updateQueryParams,
			reset
		}),
		[queryParams, isFilterUpdated, updateQueryParams, reset]
	)
}
