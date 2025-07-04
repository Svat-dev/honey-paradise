import { sessionService } from "@/services/session.service";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export const useGetByUserS = () => {
	const { data, refetch, isLoading, isPending } = useQuery({
		queryKey: ["get sessions by user"],
		queryFn: () => sessionService.getByUser(),
	});

	return useMemo(
		() => ({ sessions: data, isSessionsLoading: isLoading || isPending, sessionsRefetch: refetch }),
		[data, isLoading, isPending]
	);
};
