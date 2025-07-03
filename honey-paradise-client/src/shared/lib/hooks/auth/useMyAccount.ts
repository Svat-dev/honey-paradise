import { useEffect, useMemo } from "react";

import { useAuth } from "./useAuth";
import { useClearSessionS } from "@/services/hooks/session";
import { useLogoutS } from "@/services/hooks/auth";
import { useMyAccountS } from "@/services/hooks/account";

export const useMyAccount = () => {
	const { isAuthenticated, exit, auth } = useAuth();

	const { acc, accError, accRefetch, isAccLoading } = useMyAccountS();
	const { logout } = useLogoutS();
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
			isAccLoading,
			accRefetch,
			logout,
			accError,
		}),
		[acc?.data, isAccLoading, accError, accRefetch]
	);
};
