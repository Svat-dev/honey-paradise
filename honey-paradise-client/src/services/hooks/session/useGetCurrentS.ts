import { sessionService } from "@/services/session.service";
import { useQuery } from "@tanstack/react-query";

export const useGetCurrentS = () => {
	const { data, isPending, isLoading } = useQuery({
		queryKey: ["get current session"],
		queryFn: () => sessionService.getCurrent(),
	});

	return { currentSession: data, isSessionLoading: isLoading || isPending };
};
