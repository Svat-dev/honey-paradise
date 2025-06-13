import { accountService } from "@/services/account.service";
import { useAuth } from "@hooks/auth";
import { useQuery } from "@tanstack/react-query";

export const useMyAccountS = () => {
	const { isAuthenticated } = useAuth();

	const { error, isLoading, data, isPending, refetch } = useQuery({
		queryKey: ["get my account"],
		queryFn: () => accountService.getMyAccount(),
		enabled: isAuthenticated,
	});

	return {
		accError: error,
		isAccLoading: isLoading || isPending,
		acc: data,
		accRefetch: refetch,
	};
};
