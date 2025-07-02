import { useEffect, useState } from "react";

import { useMyAccountS } from "@/services/hooks/account";
import { useLogoutS } from "@/services/hooks/auth";
import { useClearSessionS } from "@/services/hooks/session";
import { IUserFull } from "@/shared/types/models";
import { useAuth } from "./useAuth";

export const useMyAccount = () => {
	const { isAuthenticated, exit, auth } = useAuth();
	const { acc, accError, accRefetch, isAccLoading } = useMyAccountS();
	const { logout } = useLogoutS();
	const { clearSession } = useClearSessionS();

	const [user, setUser] = useState<IUserFull | undefined>(undefined);

	useEffect(() => {
		if (accError) {
			if (isAuthenticated) clearSession();
			return exit();
		}

		setUser(acc?.data);

		if (!isAuthenticated && !accError) auth();
	}, [isAuthenticated, acc?.data, accError]);

	return {
		user,
		isAccLoading,
		accRefetch,
		logout,
		accError,
	};
};
