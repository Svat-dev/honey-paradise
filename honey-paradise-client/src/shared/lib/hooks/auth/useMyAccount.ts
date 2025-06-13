import { useMyAccountS } from "@/services/hooks/account";
import { useLogoutS } from "@/services/hooks/auth";
import { useClearSessionS } from "@/services/hooks/session/useClearSessionS";
import { useEffect } from "react";
import { useAuth } from "./useAuth";

export const useMyAccount = () => {
	const { isAuthenticated, exit } = useAuth();
	const { acc, accError, accRefetch, isAccLoading } = useMyAccountS();
	const { logout } = useLogoutS();
	const { clearSession } = useClearSessionS();

	useEffect(() => {
		if (accError) {
			if (isAuthenticated) clearSession();
			exit();
		}
	}, [isAuthenticated, acc?.data, accError]);

	return {
		user: acc?.data,
		isAccLoading,
		accRefetch,
		logout,
	};
};
