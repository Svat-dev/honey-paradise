"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui";

import { EnumUserRoles } from "@/shared/types/models";
import { useMyAccount } from "@hooks/auth";
import { cn } from "@utils/base";
import { getAvatarPath } from "@utils/get-avatar-path";
import type { AxiosError } from "axios";
import type { FC } from "react";
import styles from "../../styles/right-part.module.scss";
import { ProfileError } from "./ProfileError";
import { ProfileLoading } from "./ProfileLoading";

interface IProfileBlock {
	t: any;
	picturePosition?: "left" | "right";
}

const ProfileBlock: FC<IProfileBlock> = ({ t, picturePosition }) => {
	const { user, accError, isAccLoading } = useMyAccount();

	if (accError) return <ProfileError error={accError as AxiosError} />;

	const isReversed = picturePosition ? picturePosition === "left" : false;

	const role = user?.role.toLowerCase() || EnumUserRoles.REGULAR.toLowerCase();

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
