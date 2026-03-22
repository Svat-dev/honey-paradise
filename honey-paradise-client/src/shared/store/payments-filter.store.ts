import { create } from "zustand"

import type { IPaymentFilterStore } from "./types/payments-filter-store.type"

const initialQS: Omit<IPaymentFilterStore, "reset" | "update"> = {
	params: {
		field: "createdAt",
		type: "desc",
		page: 1,
		per_page: 15,
		status: [0, 1, 2],
		q: ""
	},
	isFilterUpdated: false
}

export const paymentsFilterStore = create<IPaymentFilterStore>(set => ({
	...initialQS,

	reset: () => set(initialQS),

	update: data =>
		set(({ params }) => ({
			params: { ...params, ...data },
			isFilterUpdated: true
		}))
}))
