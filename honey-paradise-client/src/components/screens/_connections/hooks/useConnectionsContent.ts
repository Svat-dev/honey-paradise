import { useGetAllS, useRemoveProviderS } from "@/services/hooks/providers";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

import { errorCatch } from "@/api/api-helper";
import { EnumProviderTypes } from "@/shared/types/models";
import { API_URL } from "@constants/base";
import { EnumApiRoute } from "@constants/routes";
import { getProviderName } from "@utils/get-provider-name";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import type { IConnectionsData } from "../types/connections.type";

export const useConnectionsContent = (oauth: string, connect: string) => {
	const { connections, isConnectionsLoading } = useGetAllS();
	const { removeProviderAsync, isRemoving } = useRemoveProviderS();

	const { replace } = useRouter();
	const pathname = usePathname();

	const data: IConnectionsData[] = useMemo(
		() => [
			{
				name: getProviderName("YANDEX"),
				type: EnumProviderTypes.YANDEX,
				src: "/icons/providers/yandex.svg",
			},
			{
				name: getProviderName("GITHUB"),
				type: EnumProviderTypes.GITHUB,
				src: "/icons/providers/github.svg",
			},
			{
				name: getProviderName("GOOGLE"),
				type: EnumProviderTypes.GOOGLE,
				src: "/icons/providers/google.svg",
			},
			{
				name: getProviderName("VK"),
				type: EnumProviderTypes.VK,
				src: "/icons/providers/vk.svg",
			},
		],
		[]
	);

	const handleClick = async (pid: string | undefined, type: EnumProviderTypes) => {
		if (typeof pid === "string") {
			try {
				await removeProviderAsync(pid);
				toast.success(`Учетная запись ${getProviderName(type)} отвязана!`);
			} catch (error) {
				const { errMsg } = errorCatch(error as AxiosError);
				toast.error(errMsg);
			}
		} else replace(API_URL + EnumApiRoute.OAUTH_CONNECT + `/${type.toLowerCase()}`);
	};

	useEffect(() => {
		if (oauth === "true") {
			toast.success("Авторизация успешна!");
			replace(pathname, { scroll: true });
		} else if (connect === "true") {
			toast.success("Учетная запись успешно привязана!");
			replace(pathname, { scroll: true });
		}
	}, []);

	return {
		data,
		connections,
		isConnectionsLoading,
		handleClick,
		isRemoving,
	};
};
