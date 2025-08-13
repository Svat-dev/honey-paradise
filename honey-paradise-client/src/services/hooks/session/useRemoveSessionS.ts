import { sessionService } from "@/services/session.service";
import { useMutation } from "@tanstack/react-query";

export const useRemoveSessionS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["remove session"],
		mutationFn: (sid: string) => sessionService.removeSession(sid),
	});

	return {
		removeSessionAsync: mutateAsync,
		removeSession: mutate,
		isRemovingSession: isPending,
	};
};

export const useRemoveAllSessionsS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["remove all sessions"],
		mutationFn: () => sessionService.removeAllSessions(),
	});

	return {
		removeAllSessions: mutateAsync,
		isAllSessionsRemoving: isPending,
	};
};
