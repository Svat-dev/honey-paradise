"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui";
import { useAuth, useMyAccount } from "@hooks/auth";
import { cn } from "@utils/base";
import { LogOutIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, type FC } from "react";
import styles from "../../styles/logout-button.module.scss";
import { LogoutButtonDMI } from "./LogoutButtonDMI";

interface ILogoutButton {
	reversed?: boolean;
}

const LogoutButton: FC<ILogoutButton> = ({ reversed }) => {
	const t = useTranslations("layout.root-sidebar.footer.logout");
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { isAuthenticated } = useAuth();
	const { logout } = useMyAccount();

	const onClick = (type: "full" | "partial") => {
		if (type === "partial") logout();
	};

	if (!isAuthenticated) return <></>;

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				<button
					type="button"
					title={t("labels.logout")}
					className={cn(styles["logout-btn-dmt"], {
						"tw-flex-row-reverse hover:-tw-translate-x-2 tw-w-fit": reversed,
						"hover:tw-translate-x-2": !reversed,
					})}
				>
					<LogOutIcon size={20} strokeWidth={3} />
					<p>{t("title")}</p>
				</button>
			</DropdownMenuTrigger>

			<DropdownMenuContent className={styles["logout-btn-dmc"]}>
				<DropdownMenuLabel className="tw-sr-only">{}</DropdownMenuLabel>

				<LogoutButtonDMI
					title={t("options.short.title")}
					description={t("options.short.description")}
					descClassName="-tw-top-14"
					onClick={() => onClick("partial")}
				/>

				<LogoutButtonDMI
					title={t("options.full.title")}
					description={t("options.full.description")}
					descClassName="-tw-top-6"
					onClick={() => onClick("full")}
				/>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export { LogoutButton };
