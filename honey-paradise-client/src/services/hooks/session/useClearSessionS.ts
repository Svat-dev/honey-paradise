import { sessionService } from "@/services/session.service";
import { useMutation } from "@tanstack/react-query";

export const useClearSessionS = () => {
	const { mutate, isPending } = useMutation({
		mutationKey: ["clear session"],
		mutationFn: () => sessionService.clearSession(),
	});

	return { clearSession: mutate, isClearingSession: isPending };
};
