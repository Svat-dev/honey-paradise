import { type DependencyList, useEffect } from "react";

type UseDebounceReturn = [() => boolean | null, () => void] | any;

export const useDebounce = (fn: Function, ms: number, deps: DependencyList): UseDebounceReturn => {
	useEffect(() => {
		const handler = setTimeout(() => fn(), ms);

		return () => {
			clearTimeout(handler);
		};
	}, [...deps, ms]);
};
