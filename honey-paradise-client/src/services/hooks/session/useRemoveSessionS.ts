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
