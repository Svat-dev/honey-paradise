import { queryKeys } from "@constants/routes"
import { useAuth } from "@hooks/auth"
import {
	type RefetchOptions,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"
import type { AxiosError } from "axios"

import { accountService } from "@/services/account.service"

export const useMyAccountS = (enabled: boolean = true) => {
	const client = useQueryClient()
	const { isAuthenticated } = useAuth()

	const queryKey = [queryKeys.getMyAccount]

	const { error, isLoading, data, isPending, refetch, isSuccess } = useQuery({
		queryKey,
		queryFn: () => accountService.getMyAccount(),
		enabled: isAuthenticated && enabled
	})

	const accRefetch = (opts?: RefetchOptions) => {
		client.invalidateQueries({ queryKey, type: "all" })
		refetch(opts)
	}

	return {
		accError: error as AxiosError,
		isAccLoading: isLoading || isPending,
		acc: data,
		accRefetch,
		isAccSuccess: isSuccess
	}
}
