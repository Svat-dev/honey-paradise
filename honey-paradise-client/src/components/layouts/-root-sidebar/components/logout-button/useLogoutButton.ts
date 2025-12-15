import { useAuth, useMyAccount } from "@/shared/lib/hooks/auth";

import { EnumStorageKeys } from "@/shared/lib/constants/base";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useState } from "react";

export const useLogoutButton = (oneClick: boolean) => {
	const t = useTranslations("layout.root-sidebar.footer.logout");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { isAuthenticated } = useAuth();
	const { user, logout } = useMyAccount();

	const onClick = async (type: "full" | "partial") => {
		if (oneClick) return;

		if (type === "partial") return await logout();
		else {
			await logout();

			Cookies.remove(EnumStorageKeys.LANGUAGE);
			Cookies.remove(EnumStorageKeys.THEME_MODE);
		}
	};

	const onOpenChange = async (state: boolean) => {
		if (user?.settings.useFullLogout) return onClick("full");

		if (oneClick) {
			if (!state) return setIsOpen(false);

			return await logout();
		} else setIsOpen(state);
	};

	return {
		t,
		isOpen,
		isAuthenticated,
		onClick,
		onOpenChange,
	};
};
