import { accountService } from "@/services/account.service";
import { useAuth } from "@hooks/auth";
import { type RefetchOptions, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyAccountS = () => {
	const client = useQueryClient();
	const { isAuthenticated } = useAuth();

	const queryKey = ["get my account"];

	const { error, isLoading, data, isPending, refetch } = useQuery({
		queryKey,
		queryFn: () => accountService.getMyAccount(),
		enabled: isAuthenticated,
		// refetchInterval: 1000 * 15, // must be 1 minute
	});

	const accRefetch = (opts?: RefetchOptions) => {
		client.invalidateQueries({ queryKey, type: "all" });
		refetch(opts);
	};

	return {
		accError: error,
		isAccLoading: isLoading || isPending,
		acc: data,
		accRefetch,
	};
};
