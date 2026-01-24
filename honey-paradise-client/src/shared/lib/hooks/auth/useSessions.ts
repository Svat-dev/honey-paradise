import { useMemo } from "react"

import {
	useGetByUserS,
	useGetCurrentS,
	useRemoveAllSessionsS,
	useRemoveSessionS
} from "@/services/hooks/session"

export const useSessions = () => {
	const { currentSession, isSessionLoading, isSuccess } = useGetCurrentS()
	const { sessions, sessionsRefetch, isSessionsLoading } = useGetByUserS()
	const { removeSessionAsync, isRemovingSession } = useRemoveSessionS()
	const { removeAllSessions, isAllSessionsRemoving } = useRemoveAllSessionsS()

	const remove = async (sid: string) => {
		await removeSessionAsync(sid)
		sessionsRefetch()
	}

	const removeAll = async () => {
		await removeAllSessions()
		sessionsRefetch()
	}

	const isLoading =
		isSessionLoading ||
		isSessionsLoading ||
		isRemovingSession ||
		isAllSessionsRemoving

	return useMemo(
		() => ({
			sessions: sessions?.data,
			currentSession: currentSession?.data,
			removeSession: remove,
			removeAllSessions: removeAll,
			sessionsRefetch,
			isSessionLoading: isLoading,
			isSessionSuccess: isSuccess
		}),
		[sessions?.data, currentSession?.data, isLoading, isSuccess]
	)
}
