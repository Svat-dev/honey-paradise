import { create } from "zustand"

import type { IPaymentFilterStore } from "./types/payments-filter-store.type"

const initialQS: Omit<
	IPaymentFilterStore,
	"reset" | "update" | "updatePagination"
> = {
	params: {
		field: "createdAt",
		type: "desc",
		page: 1,
		pagination: null,
		per_page: 15,
		status: [0, 1, 2],
		q: ""
	},
	isFilterUpdated: false
}

export const paymentsFilterStore = create<IPaymentFilterStore>(set => ({
	...initialQS,

	reset: () => set(initialQS),

	updatePagination: length =>
		set(({ params }) => ({
			params: { ...params, pagination: Math.ceil(length / params.per_page) }
		})),

	update: data =>
		set(({ params }) => ({
			params: { ...params, ...data },
			isFilterUpdated: true
		}))
}))
