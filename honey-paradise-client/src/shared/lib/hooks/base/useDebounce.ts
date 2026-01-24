import { type DependencyList, useEffect, useState } from "react"

type UseDebounceReturn = [() => boolean | null, () => void] | any

export function useDebounce(
	fn: Function,
	ms: number,
	deps: DependencyList
): UseDebounceReturn
export function useDebounce<T>(value: T, ms: number): T
export function useDebounce<T>(
	value: T | Function,
	ms: number | DependencyList,
	deps?: DependencyList
): T | UseDebounceReturn {
	if (typeof value === "function") {
		return useDebounceFn(value, ms as number, deps as DependencyList)
	} else {
		return useDebounceValue(value, ms as number)
	}
}

const useDebounceFn = (
	fn: Function,
	ms: number,
	deps: DependencyList
): UseDebounceReturn => {
	useEffect(() => {
		const handler = setTimeout(() => fn(), ms)

		return () => {
			clearTimeout(handler)
		}
	}, [...deps, ms])
}

const useDebounceValue = <T>(value: T, ms: number): T => {
	const [debouncedValue, setDebouncedValue] = useState<T>(value)

	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value)
		}, ms)

		return () => {
			clearTimeout(handler)
		}
	}, [value, ms])

	return debouncedValue
}
