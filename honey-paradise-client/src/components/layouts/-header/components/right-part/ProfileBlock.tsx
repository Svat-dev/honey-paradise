"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/common";

import type { FC } from "react";
import { GetMeResponseRole } from "@/shared/types/server";
import { ProfileLoading } from "./ProfileLoading";
import { cn } from "@utils/base";
import { getAvatarPath } from "@utils/get-avatar-path";
import styles from "../../styles/right-part.module.scss";
import { useMyAccount } from "@hooks/auth";

interface IProfileBlock {
	t: any;
	picturePosition?: "left" | "right";
}

const ProfileBlock: FC<IProfileBlock> = ({ t, picturePosition }) => {
	const { user, accError, isAccLoading } = useMyAccount();

	if (accError) return;

	const isReversed = picturePosition ? picturePosition === "left" : false;

	const role = user?.role.toLowerCase() || GetMeResponseRole.REGULAR.toLowerCase();

	return (
		<div className={cn(styles["profile-block-wrapper"], { "tw-flex-row-reverse": isReversed })}>
			{isAccLoading ? (
				<ProfileLoading />
			) : (
				<>
					<div className={styles["profile-block-nickname"]}>
						<span>{user?.username}</span>
						<span className={styles["profile-role"]}>{t(`roles.${role}`)}</span>
					</div>

					<Avatar className={styles["profile-avatar-wrapper"]}>
						<AvatarImage src={getAvatarPath(user?.avatarPath)} alt={t("labels.avatar")} width={40} height={40} loading="eager" />
						<AvatarFallback>{user?.username.split("")[0]}</AvatarFallback>
					</Avatar>
				</>
			)}
		</div>
	);
};

export { ProfileBlock };
