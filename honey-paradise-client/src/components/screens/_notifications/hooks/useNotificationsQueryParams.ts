import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { INotificationsQueryParams } from "@/services/types/notifications-service.type";
import { notificationsFilterStore } from "@/shared/store/notifications-filter.store";
import { useEffect } from "react";

export const useNotificationsQueryParams = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const isFilterUpdated = notificationsFilterStore(state => state.isFilterUpdated);
	const queryParams = notificationsFilterStore(state => state.queryParams);
	const updateQueryParam = notificationsFilterStore(state => state.updateQueryParam);
	const _reset = notificationsFilterStore(state => state.reset);

	const updateQueryParams = (key: keyof INotificationsQueryParams, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());

		if (value) newParams.set(key, String(value));
		else newParams.delete(key);

		replace(pathname + `?${newParams.toString()}`, { scroll: false });
		updateQueryParam({ key, value: key === "types" ? value.split(",") : value });
	};

	const reset = () => {
		_reset();
		replace(pathname);
	};

	useEffect(() => {
		searchParams.forEach((value, key) => {
			updateQueryParam({
				key: key as keyof INotificationsQueryParams,
				value: key === "types" ? value.split(",") : value,
			});
		});
	}, []);

	return {
		updateQueryParams,
		queryParams,
		isFilterUpdated,
		reset,
	};
};
