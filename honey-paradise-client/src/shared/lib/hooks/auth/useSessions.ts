import { useGetByUserS, useGetCurrentS, useRemoveSessionS } from "@/services/hooks/session";

export const useSessions = () => {
	const { currentSession, isSessionLoading } = useGetCurrentS();
	const { sessions, sessionsRefetch, isSessionsLoading } = useGetByUserS();
	const { removeSessionAsync, isRemovingSession } = useRemoveSessionS();

	const remove = async (sid: string) => {
		await removeSessionAsync(sid);
		sessionsRefetch();
	};

	const isLoading = isSessionLoading || isSessionsLoading || isRemovingSession;

	return {
		sessions: sessions?.data,
		currentSession: currentSession?.data,
		removeSession: remove,
		sessionsRefetch,
		isSessionLoading: isLoading,
	};
};
