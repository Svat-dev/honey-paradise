import { sessionService } from "@/services/session.service";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentS = () => {
	const { data, isPending, isLoading } = useQuery({
		queryKey: ["get current session"],
		queryFn: () => sessionService.getCurrent(),
	});

	return useMemo(
		() => ({
			currentSession: data,
			isSessionLoading: isLoading || isPending,
		}),
		[data, isLoading, isPending]
	);
};
