import { useQuery } from "@tanstack/react-query"

import { sessionService } from "@/services/session.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import { useAuth } from "@/shared/lib/hooks/auth"

export const useGetCurrentS = () => {
	const { isAuthenticated } = useAuth()

	const { data, isPending, isLoading, isSuccess } = useQuery({
		queryKey: [queryKeys.getCurrentSession],
		queryFn: () => sessionService.getCurrent(),
		enabled: isAuthenticated
	})

	return {
		currentSession: data,
		isSessionLoading: isLoading || isPending,
		isSuccess
	}
}
