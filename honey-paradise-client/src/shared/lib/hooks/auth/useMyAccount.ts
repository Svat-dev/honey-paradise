import { useEffect, useMemo } from "react";

import { useMyAccountS } from "@/services/hooks/account";
import { useLogoutS } from "@/services/hooks/auth";
import { useClearSessionS } from "@/services/hooks/session";
import { useAuth } from "./useAuth";

export const useMyAccount = () => {
	const { isAuthenticated, exit, auth } = useAuth();

	const { acc, accError, accRefetch, isAccLoading } = useMyAccountS();
	const { logout, isLogoutLoading } = useLogoutS();
	const { clearSession } = useClearSessionS();

	useEffect(() => {
		if (accError) {
			if (isAuthenticated) clearSession();
			return exit();
		}

		if (!isAuthenticated && !accError) auth();
	}, [isAuthenticated, acc?.data, accError]);

	return useMemo(
		() => ({
			user: acc?.data,
			isAccLoading: isLogoutLoading || isAccLoading,
			accRefetch,
			logout,
			accError,
		}),
		[acc?.data, isAccLoading, isLogoutLoading, accError, accRefetch, isAuthenticated]
	);
};
