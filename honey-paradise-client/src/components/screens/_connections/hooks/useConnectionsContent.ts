import { API_URL } from "@constants/base"
import { EnumApiRoute } from "@constants/routes"
import type { AxiosError } from "axios"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useMemo } from "react"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useGetAllS, useRemoveProviderS } from "@/services/hooks/providers"
import { getProviderName } from "@/shared/lib/utils/session/get-provider-name"
import { GetAllConnectionsResponseType } from "@/shared/types/server"

import type { IConnectionsData } from "../types/connections.type"

export const useConnectionsContent = (oauth: string, connect: string) => {
	const { connections, isConnectionsLoading } = useGetAllS()
	const { removeProviderAsync, isRemoving } = useRemoveProviderS()

	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const data: IConnectionsData[] = useMemo(
		() => [
			{
				name: getProviderName("YANDEX"),
				type: GetAllConnectionsResponseType.YANDEX,
				src: "/icons/providers/yandex.svg"
			},
			{
				name: getProviderName("GITHUB"),
				type: GetAllConnectionsResponseType.GITHUB,
				src: "/icons/providers/github.svg"
			},
			{
				name: getProviderName("GOOGLE"),
				type: GetAllConnectionsResponseType.GOOGLE,
				src: "/icons/providers/google.svg"
			},
			{
				name: getProviderName("VK"),
				type: GetAllConnectionsResponseType.VK,
				src: "/icons/providers/vk.svg"
			}
		],
		[]
	)

	const handleClick = async (
		pid: string | undefined,
		type: GetAllConnectionsResponseType
	) => {
		if (typeof pid === "string") {
			try {
				await removeProviderAsync(pid)
				toast.success(`Учетная запись ${getProviderName(type)} отвязана!`)
			} catch (error) {
				const { errMsg } = errorCatch(error as AxiosError)
				toast.error(errMsg)
			}
		} else
			replace(API_URL + EnumApiRoute.OAUTH_CONNECT + `/${type.toLowerCase()}`)
	}

	useEffect(() => {
		if (oauth === "true") {
			toast.success("Авторизация успешна!")
			return replace(pathname, { scroll: true })
		} else if (connect === "true") {
			toast.success("Учетная запись успешно привязана!")
			return replace(pathname, { scroll: true })
		} else if (
			searchParams.get("error") &&
			searchParams.get("error") === "true"
		) {
			const msg = searchParams.get("message") || ""
			const sts = searchParams.get("status") || ""

			toast.error(`Произошла ошибка ${sts}: \n${msg}`)
			return replace(pathname, { scroll: true })
		}
	}, [])

	return {
		data,
		connections,
		isConnectionsLoading,
		handleClick,
		isRemoving
	}
}
