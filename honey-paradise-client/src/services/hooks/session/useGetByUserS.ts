import {
	type RefetchOptions,
	useQuery,
	useQueryClient
} from "@tanstack/react-query"

import { sessionService } from "@/services/session.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import { useAuth } from "@/shared/lib/hooks/auth"

export const useGetByUserS = () => {
	const client = useQueryClient()
	const { isAuthenticated } = useAuth()

	const queryKey = [queryKeys.getUserSessions]

	const { data, refetch, isLoading, isPending } = useQuery({
		queryKey,
		queryFn: () => sessionService.getByUser(),
		enabled: isAuthenticated
	})

	const sessionsRefetch = (opts?: RefetchOptions) => {
		client.invalidateQueries({ queryKey, type: "all" })
		refetch(opts)
	}

	return {
		sessions: data,
		isSessionsLoading: isLoading || isPending,
		sessionsRefetch
	}
}
