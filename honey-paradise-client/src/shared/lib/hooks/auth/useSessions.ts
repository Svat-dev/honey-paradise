import { useGetByUserS, useGetCurrentS, useRemoveAllSessionsS, useRemoveSessionS } from "@/services/hooks/session";

import { useMemo } from "react";

export const useSessions = () => {
	const { currentSession, isSessionLoading } = useGetCurrentS();
	const { sessions, sessionsRefetch, isSessionsLoading } = useGetByUserS();
	const { removeSessionAsync, isRemovingSession } = useRemoveSessionS();
	const { removeAllSessions, isAllSessionsRemoving } = useRemoveAllSessionsS();

	const remove = async (sid: string) => {
		await removeSessionAsync(sid);
		sessionsRefetch();
	};

	const removeAll = async () => {
		await removeAllSessions();
		sessionsRefetch();
	};

	const isLoading = isSessionLoading || isSessionsLoading || isRemovingSession || isAllSessionsRemoving;

	return useMemo(
		() => ({
			sessions: sessions?.data,
			currentSession: currentSession?.data,
			removeSession: remove,
			removeAllSessions: removeAll,
			sessionsRefetch,
			isSessionLoading: isLoading,
		}),
		[sessions?.data, currentSession?.data, isLoading]
	);
};
