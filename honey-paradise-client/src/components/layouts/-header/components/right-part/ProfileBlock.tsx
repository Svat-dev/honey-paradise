"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/common";

import { GetMeResponseRole } from "@/shared/types/server";
import { useMyAccount } from "@hooks/auth";
import { cn } from "@utils/base";
import { getAvatarPath } from "@utils/get-avatar-path";
import { m } from "motion/react";
import { type FC } from "react";
import styles from "../../styles/right-part.module.scss";
import { ProfileLoading } from "./ProfileLoading";

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
		<div className={cn(styles["profile-block-wrapper"], { "flex-row-reverse": isReversed })}>
			{isAccLoading ? (
				<ProfileLoading />
			) : (
				<>
					<m.div className={styles["profile-block-nickname"]} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
						<span>{user?.username}</span>
						<span className={styles["profile-role"]}>{t(`roles.${role}`)}</span>
					</m.div>

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
