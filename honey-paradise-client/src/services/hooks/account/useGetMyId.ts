import { accountService } from "@/services/account.service";
import { useAuth } from "@hooks/auth";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export const useGetMyId = () => {
	const { isAuthenticated } = useAuth();

	const { data } = useQuery({
		queryKey: ["get my id"],
		queryFn: () => accountService.getMyId(),
		enabled: isAuthenticated,
	});

	return useMemo(
		() => ({
			userId: data?.data.userId,
		}),
		[data?.data]
	);
};
