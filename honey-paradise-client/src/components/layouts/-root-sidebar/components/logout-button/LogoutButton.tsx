"use client";

import { DropdownMenu, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/common";

import { cn } from "@utils/base";
import { LogOutIcon } from "lucide-react";
import dynamic from "next/dynamic";
import type { FC } from "react";
import styles from "../../styles/logout-button.module.scss";
import { LogoutButtonDMI } from "./LogoutButtonDMI";
import { useLogoutButton } from "./useLogoutButton";

const DynamicDropdownMenuContent = dynamic(() => import("@/components/ui/common").then(mod => mod.DropdownMenuContent));

interface ILogoutButton {
	reversed?: boolean;
	oneClick?: boolean;
}

const LogoutButton: FC<ILogoutButton> = ({ reversed, oneClick }) => {
	const { isAuthenticated, isOpen, onOpenChange, onClick, t } = useLogoutButton(!!oneClick);

	if (!isAuthenticated) return <></>;

	return (
		<DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
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

			<DynamicDropdownMenuContent className={styles["logout-btn-dmc"]}>
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
			</DynamicDropdownMenuContent>
		</DropdownMenu>
	);
};

export { LogoutButton };
