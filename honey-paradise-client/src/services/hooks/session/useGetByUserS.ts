import { sessionService } from "@/services/session.service";
import { useQuery } from "@tanstack/react-query";

export const useGetByUserS = () => {
	const { data, refetch, isLoading, isPending } = useQuery({
		queryKey: ["get sessions by user"],
		queryFn: () => sessionService.getByUser(),
	});

	return { sessions: data, isSessionsLoading: isLoading || isPending, sessionsRefetch: refetch };
};
