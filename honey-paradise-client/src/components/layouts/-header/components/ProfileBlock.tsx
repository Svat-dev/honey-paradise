"use client";

import { cn } from "@/shared/lib/utils/base";
import { useMyAccount } from "@hooks/auth";
import Image from "next/image";
import type { FC } from "react";

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
		<div className={cn("tw-flex tw-items-center tw-gap-3", { "tw-flex-row-reverse": !isBase })}>
			<div className="tw-flex tw-flex-col tw-leading-4">
				<span>{user?.username}</span>
				<span className="tw-text-sm tw-text-muted">{t(`roles.${role}`)}</span>
			</div>

			{user?.avatarPath ? (
				<Image alt="Иконка профиля" src={user.avatarPath} width={40} height={40} />
			) : (
				<div className="tw-w-9 tw-h-9 tw-bg-gray-300 tw-rounded-full" />
			)}
		</div>
	);
};

export { ProfileBlock };
