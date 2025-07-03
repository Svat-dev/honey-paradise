import { accountService } from "@/services/account.service";
import { useAuth } from "@hooks/auth";
import { type RefetchOptions, useQuery, useQueryClient } from "@tanstack/react-query";

export const useMyAccountS = () => {
	const client = useQueryClient();
	const { isAuthenticated } = useAuth();

	const queryKey = ["get my account"];

	const { error, isLoading, data, isPending, refetch } = useQuery({
		queryKey: ["get my account"],
		queryFn: () => accountService.getMyAccount(),
		enabled: isAuthenticated,
		staleTime: 0,
	});

	const accRefetch = (opts?: RefetchOptions) => {
		client.invalidateQueries({ queryKey: ["get my account"], type: "all" });
		refetch(opts);
	};

	return {
		accError: error,
		isAccLoading: isLoading || isPending,
		acc: data,
		accRefetch,
	};
};
