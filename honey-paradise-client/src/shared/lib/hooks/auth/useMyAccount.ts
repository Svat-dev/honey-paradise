import { useMutation, useQuery } from "@tanstack/react-query";

import { accountService } from "@/services/account.service";
import { authService } from "@/services/auth.service";
import { sessionService } from "@/services/session.service";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useMyAccount = () => {
	const { isAuthenticated, exit } = useAuth();

	const { error, isLoading, data, isPending, refetch } = useQuery({
		queryKey: ["get my account"],
		queryFn: () => accountService.getMyAccount(),
		enabled: isAuthenticated,
	});

	const { mutate: logout } = useMutation({
		mutationKey: ["logout"],
		mutationFn: () => authService.logout(),
		onSuccess: exit,
	});

	const { mutate } = useMutation({
		mutationKey: ["clear session"],
		mutationFn: () => sessionService.clearSession(),
	});

	useEffect(() => {
		if (error) {
			if (isAuthenticated) mutate();
			exit();
		}
	}, [isAuthenticated, data?.data, error]);

	return {
		user: data?.data,
		isLoadingProfile: isLoading || isPending,
		refetch,
		logout,
	};
};
