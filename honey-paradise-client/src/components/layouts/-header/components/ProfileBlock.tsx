"use client";

import { useMyAccount } from "@hooks/auth";
import { cn } from "@utils/base";
import { getAvatarPath } from "@utils/get-avatar-path";
import Image from "next/image";
import type { FC } from "react";
import styles from "../styles/right-part.module.scss";

interface IProfileBlock {
	t: any;
	picturePosition?: "left" | "right";
}

const ProfileBlock: FC<IProfileBlock> = ({ t, picturePosition }) => {
	const { user } = useMyAccount();

	if (!user) return null;

	const isBase = picturePosition ? picturePosition === "right" : true;
	const role = user.role.toLowerCase();

	return (
		<div className={cn(styles["profile-block-wrapper"], { "tw-flex-row-reverse": !isBase })}>
			<div className={styles["profile-block-nickname"]}>
				<span>{user?.username}</span>
				<span className={styles["profile-block-role"]}>{t(`roles.${role}`)}</span>
			</div>

			{user.avatarPath && (
				<Image
					src={getAvatarPath(user.avatarPath)}
					alt={t("labels.avatar")}
					width={40}
					height={40}
					className={cn(styles["profile-block-avatar"], { "tw-mr-6": isBase })}
					priority
				/>
			)}
		</div>
	);
};

export { ProfileBlock };
