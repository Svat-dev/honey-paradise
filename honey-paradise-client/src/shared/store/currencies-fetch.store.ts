import { create } from "zustand"

import type { ICurrenciesFetchStore } from "./types/currencies-fetch-store.type"

const initialQS: Omit<ICurrenciesFetchStore, "setData" | "reset"> = {
	base: null,
	disclaimer: null,
	license: null,
	rates: null,
	timestamp: null
}

export const currenciesFetchStore = create<ICurrenciesFetchStore>(set => ({
	...initialQS,

	setData: data => set({ ...data }),

	reset: () => set({ ...initialQS })
}))
