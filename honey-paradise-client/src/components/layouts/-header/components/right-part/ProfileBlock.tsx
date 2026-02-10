"use client"

import { useMyAccount } from "@hooks/auth"
import { cn } from "@utils/base"
import { getAvatarPath, getFramesPath } from "@utils/get-avatar-path"
import { m } from "motion/react"
import { type FC } from "react"

import {
	Avatar,
	AvatarFallback,
	AvatarFrame,
	AvatarImage
} from "@/components/ui/common"
import { GetMeResponseRole } from "@/shared/types/server"

import styles from "../../styles/right-part.module.scss"

import { ProfileLoading } from "./ProfileLoading"

interface IProfileBlock {
	t: any
	picturePosition?: "left" | "right"
}

const ProfileBlock: FC<IProfileBlock> = ({ t, picturePosition }) => {
	const { user, accError, isAccLoading } = useMyAccount()

	if (accError) return

	const isReversed = picturePosition ? picturePosition === "left" : false

	const role =
		user?.role.toLowerCase() || GetMeResponseRole.REGULAR.toLowerCase()

	return (
		<div
			className={cn(styles["profile-block-wrapper"], {
				"flex-row-reverse": isReversed
			})}
		>
			{isAccLoading ? (
				<ProfileLoading />
			) : (
				<>
					<m.div
						className={styles["profile-block-nickname"]}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
					>
						<span>{user?.username}</span>
						<span className={styles["profile-role"]}>{t(`roles.${role}`)}</span>
					</m.div>

					<Avatar className={styles["profile-avatar-wrapper"]}>
						<AvatarImage
							src={getAvatarPath(user?.avatarPath)}
							alt={t("labels.avatar")}
							width={44}
							height={44}
							loading="eager"
						/>

						{user?.framePath && (
							<AvatarFrame
								src={getFramesPath(user.framePath)}
								alt=""
								width={44}
								height={44}
								loading="lazy"
							/>
						)}

						<AvatarFallback>{user?.username.split("")[0]}</AvatarFallback>
					</Avatar>
				</>
			)}
		</div>
	)
}

export { ProfileBlock }
