import { useMutation } from "@tanstack/react-query"

import { sessionService } from "@/services/session.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useRemoveSessionS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.deleteSession],
		mutationFn: (sid: string) => sessionService.removeSession(sid)
	})

	return {
		removeSessionAsync: mutateAsync,
		removeSession: mutate,
		isRemovingSession: isPending
	}
}

export const useRemoveAllSessionsS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.deleteAllSessions],
		mutationFn: () => sessionService.removeAllSessions()
	})

	return {
		removeAllSessions: mutateAsync,
		isAllSessionsRemoving: isPending
	}
}
