"use client";

import type { FC } from "react";
import { LogOutIcon } from "lucide-react";
import { cn } from "@utils/base";
import { useTranslations } from "next-intl";

interface ILogoutButton {
	reversed?: boolean;
}

const LogoutButton: FC<ILogoutButton> = ({ reversed }) => {
	const t = useTranslations("layout.sidebar");

	return (
		<button
			type="button"
			title={t("labels.logout")}
			className={cn("tw-text-red-600 tw-font-medium tw-flex tw-gap-1 tw-items-center tw-transition-transform tw-p-1", {
				"tw-flex-row-reverse hover:-tw-translate-x-2 tw-w-fit": reversed,
				"hover:tw-translate-x-2": !reversed,
			})}
		>
			<LogOutIcon size={20} strokeWidth={3} />
			<p>{t("footer.logout")}</p>
		</button>
	);
};

export { LogoutButton };
