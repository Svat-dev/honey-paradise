import { useTranslations } from "next-intl"

import type { PaymentsControllerGetAllByUserField } from "@/shared/types/server"

import { useTransactionsQuery } from "./useTransactionsQuery"

export const useTransactionsHeader = () => {
	const t = useTranslations("global.transactions.content")
	const { queryParams, updateQueryParams } = useTransactionsQuery()

	const titles: [string, PaymentsControllerGetAllByUserField | ""][] = [
		["Дата создания", "createdAt"],
		["Статус", ""],
		["Сумма", "amount"],
		["Способ оплаты", ""],
		["Дата подтверждения", "updatedAt"]
	]

	const handleClick = (field: PaymentsControllerGetAllByUserField | "") => {
		if (field === "") return

		if (queryParams.field === field)
			updateQueryParams("type", queryParams.type === "desc" ? "asc" : "desc")
		else {
			updateQueryParams("field", field)
			updateQueryParams("type", "desc")
		}
	}

	return {
		titles,
		handleClick,
		queryParams: { field: queryParams.field, type: queryParams.type }
	}
}
