import { sessionService } from "@/services/session.service";
import { type RefetchOptions, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetByUserS = () => {
	const client = useQueryClient();
	const queryKey = ["get sessions by user"];

	const { data, refetch, isLoading, isPending } = useQuery({
		queryKey,
		queryFn: () => sessionService.getByUser(),
	});

	const sessionsRefetch = (opts?: RefetchOptions) => {
		client.invalidateQueries({ queryKey, type: "all" });
		refetch(opts);
	};

	return { sessions: data, isSessionsLoading: isLoading || isPending, sessionsRefetch };
};
