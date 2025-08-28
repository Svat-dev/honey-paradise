import { providerService } from "@/services/providers.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useAuth } from "@hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetAllS = () => {
	const { isAuthenticated } = useAuth();

	const { data, isPending, isLoading, refetch } = useQuery({
		queryKey: [queryKeys.getAllProviders],
		queryFn: () => providerService.getAll(),
		enabled: isAuthenticated,
	});

	const _isLoading = isLoading || isPending;

	return useMemo(
		() => ({
			connections: data?.data,
			refetchConnections: refetch,
			isConnectionsLoading: _isLoading,
		}),
		[data?.data, _isLoading, refetch]
	);
};
