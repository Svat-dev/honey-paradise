import { accountService } from "@/services/account.service";
import { queryKeys } from "@constants/routes";
import { useAuth } from "@hooks/auth";
import { type RefetchOptions, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyAccountS = () => {
	const client = useQueryClient();
	const { isAuthenticated } = useAuth();

	const queryKey = [queryKeys.getMyAccount];

	const { error, isLoading, data, isPending, refetch, isSuccess } = useQuery({
		queryKey,
		queryFn: () => accountService.getMyAccount(),
		enabled: isAuthenticated,
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
		isAccSuccess: isSuccess,
	};
};
