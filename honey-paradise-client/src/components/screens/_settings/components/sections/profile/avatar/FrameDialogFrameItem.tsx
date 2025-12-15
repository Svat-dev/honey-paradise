import type { FC, MouseEvent } from "react";

import { EnumStaticRoute } from "@/shared/lib/constants/routes";
import { getFramesPath } from "@/shared/lib/utils";
import { cn } from "@/shared/lib/utils/base";
import { BanIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

interface IProps {
	value: number;
	label: string;
	frame: number;
	setFrame: VoidFunction;
}

const FrameDialogFrameItem: FC<IProps> = ({ value, label, frame, setFrame }) => {
	const t = useTranslations("global.settings.content.profile.avatar.frame");

	const handleMouseEnter = (e: MouseEvent<HTMLImageElement>) => {
		e.currentTarget.setAttribute("src", getFramesPath(`${EnumStaticRoute.ANIMATED_FRAMES}/${value - 5}.png`));
	};

	const handleMouseLeave = (e: MouseEvent<HTMLImageElement>) => {
		e.currentTarget.setAttribute("src", getFramesPath(`${EnumStaticRoute.FRAMES}/${value}.webp`));
	};

	return (
		<button
			className={cn(
				"bg-muted/20 aspect-square size-24 rounded-lg p-2 ring-muted transition-colors will-change-auto hover:bg-muted/40 disabled:cursor-not-allowed",
				{ "!bg-muted/70 ring-1": frame === value },
				{ "flex flex-col": value === 0 }
			)}
			onClick={setFrame}
			disabled={frame === value}
		>
			{value === 0 ? (
				<>
					<BanIcon size={80} />
					<p>{t("labels.nothing")}</p>
				</>
			) : (
				<Image
					src={getFramesPath(`${EnumStaticRoute.FRAMES}/${value}.webp`)}
					alt={label}
					width={80}
					height={80}
					loading="lazy"
					onMouseEnter={value > 5 ? e => handleMouseEnter(e) : undefined}
					onMouseLeave={value > 5 ? e => handleMouseLeave(e) : undefined}
				/>
			)}
		</button>
	);
};

export { FrameDialogFrameItem };
