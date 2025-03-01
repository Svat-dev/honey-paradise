"use client";

import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";

const LogoutButton = () => {
	const t = useTranslations("layout.sidebar");

	return (
		<button
			type="button"
			title={t("labels.logout")}
			className="tw-text-red-600 tw-font-medium tw-flex tw-gap-1 tw-items-center tw-transition-transform hover:tw-translate-x-2 tw-p-1"
		>
			<LogOutIcon size={20} strokeWidth={3} />
			<p>{t("footer.logout")}</p>
		</button>
	);
};

export { LogoutButton };
