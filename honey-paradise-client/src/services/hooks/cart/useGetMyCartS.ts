import { cartService } from "@/services/cart.service";
import { queryKeys } from "@constants/routes";
import { useAuth } from "@hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetMyCartS = () => {
	const { isAuthenticated } = useAuth();

	const { data, isLoading, isPending, refetch } = useQuery({
		queryKey: [queryKeys.getMyCart],
		queryFn: () => cartService.getMyCart(),
		enabled: isAuthenticated,
	});

	const _isLoading = isLoading || isPending;

	return useMemo(
		() => ({
			cart: data?.data,
			isCartLoading: _isLoading,
			refetchCart: refetch,
		}),
		[data?.data, _isLoading, refetch]
	);
};
