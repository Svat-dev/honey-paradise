import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { INotificationsQueryParams } from "@/services/types/notifications-service.type";
import { notificationsFilterStore } from "@/shared/store/notifications-filter.store";
import { useEffect } from "react";

export const useNotificationsQueryParams = () => {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const { replace } = useRouter();

	const { isFilterUpdated, queryParams, updateQueryParam } = notificationsFilterStore();

	useEffect(() => {
		searchParams.forEach((value, key) => {
			updateQueryParam({
				key: key as keyof INotificationsQueryParams,
				value,
			});
		});
	}, []);

	const updateQueryParams = (key: keyof INotificationsQueryParams, value: string) => {
		const newParams = new URLSearchParams(searchParams.toString());

		if (value) newParams.set(key, String(value));
		else newParams.delete(key);

		replace(pathname + `?${newParams.toString()}`, { scroll: false });
		updateQueryParam({ key, value });
	};

	return {
		updateQueryParams,
		queryParams,
		isFilterUpdated,
	};
};
