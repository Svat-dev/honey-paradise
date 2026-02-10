import { useEffect, useMemo, useState } from "react"

import { EnumStorageKeys } from "@/shared/lib/constants/base"

import type { ISearchHistory } from "./types/use-search.type"

export const usePresearchHistory = () => {
	const [history, setHistory] = useState<string>("[]")

	function clearHistory(type: "all"): void
	function clearHistory(type: "single", q: string): void
	function clearHistory(type: "single" | "all", q?: string) {
		if (type === "all") {
			localStorage.removeItem(EnumStorageKeys.SEARCH_HISTORY)
			setHistory("[]")
		} else {
			const data: ISearchHistory[] = JSON.parse(
				localStorage.getItem(EnumStorageKeys.SEARCH_HISTORY) || "[]"
			)
			const item = data.find(item => item.q === q)

			if (item) data.splice(data.indexOf(item), 1)

			localStorage.setItem(EnumStorageKeys.SEARCH_HISTORY, JSON.stringify(data))
			setHistory(JSON.stringify(data))
		}
	}

	useEffect(() => {
		if (localStorage.getItem(EnumStorageKeys.SEARCH_HISTORY)) {
			setHistory(localStorage.getItem(EnumStorageKeys.SEARCH_HISTORY) || "[]")
		}
	}, [])

	return useMemo(
		() => ({
			history: JSON.parse(history) as ISearchHistory[],
			clearHistory
		}),
		[history, clearHistory]
	)
}
