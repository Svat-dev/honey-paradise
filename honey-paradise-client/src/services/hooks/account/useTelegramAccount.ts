import { type RefetchOptions, useMutation, useQuery } from "@tanstack/react-query";

import { accountService } from "@/services/account.service";
import type { ITelegramInfoResponse } from "@/services/types/account-service.type";
import { queryKeys } from "@constants/routes";
import { useAuth } from "@hooks/auth";
import type { AxiosError } from "axios";
import { useEffect, useMemo, useState } from "react";

export const useConnectTgS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.connectTg],
		mutationFn: () => accountService.connectTelegram(),
	});

	return { connectTgAsync: mutateAsync, isTgConnecting: isPending };
};

export const useDisconnectTgS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.disconnectTg],
		mutationFn: () => accountService.disconnectTelegram(),
	});

	return { disconnectTgAsync: mutateAsync, isTgDisconnecting: isPending };
};

export const useGetTelegramInfoS = () => {
	const { isAuthenticated } = useAuth();

	const [telegramInfo, setTelegramInfo] = useState<Partial<ITelegramInfoResponse> | null>(null);

	const { data, refetch, isPending, isLoading, error } = useQuery({
		queryKey: [queryKeys.getTelegramInfo],
		queryFn: () => accountService.getTelegramInfo(),
		enabled: isAuthenticated,
	});

	const telegramRefetch = (opts?: RefetchOptions) => refetch(opts);

	useEffect(() => {
		if (data?.data) setTelegramInfo(data.data);
	}, [data?.data]);

	useEffect(() => {
		const e = error as AxiosError;
		if (e?.status === 400) setTelegramInfo({ connected: false });
	}, [error]);

	const isTelegramInfoLoading = isLoading || isPending;

	return useMemo(
		() => ({
			telegramInfo,
			isTelegramInfoLoading,
			telegramRefetch,
		}),
		[telegramInfo, isTelegramInfoLoading, telegramRefetch]
	);
};
