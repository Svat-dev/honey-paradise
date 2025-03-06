import { cn } from "@/shared/lib/utils/base";
import type { FC } from "react";

interface IProfileBlock {
	t: any;
	picturePosition?: "left" | "right";
}

const ProfileBlock: FC<IProfileBlock> = ({ t, picturePosition }) => {
	const isBase = picturePosition ? picturePosition === "right" : true;

	return (
		<div className={cn("tw-flex tw-items-center tw-gap-3", { "tw-flex-row-reverse": !isBase })}>
			<div className="tw-flex tw-flex-col tw-leading-4">
				<span>_swuttik_</span>
				<span className="tw-text-sm tw-text-muted">{t("roles.admin")}</span>
			</div>

			{/* <Image alt="Иконка профиля" src={} width={} height={} /> */}
			<div className="tw-w-9 tw-h-9 tw-bg-gray-300 tw-rounded-full" />
		</div>
	);
};

export { ProfileBlock };
