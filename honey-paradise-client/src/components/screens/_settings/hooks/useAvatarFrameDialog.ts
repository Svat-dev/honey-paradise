import { useEffect, useMemo, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import { useUpdateAvatarFrameS } from "@/services/hooks/profile";
import { EnumStaticRoute } from "@/shared/lib/constants/routes";
import { useLanguage } from "@/shared/lib/i18n/hooks";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface IFrameData {
	label: string;
	value: number;
}

export const useAvatarFrameDialog = (framePath: string | undefined | null) => {
	const t = useTranslations("global.settings.content.profile.avatar.frame");
	const { locale } = useLanguage(false);

	const [frame, setFrame] = useState<number>(0);
	const [url, setUrl] = useState<string | null>(typeof framePath === "undefined" ? null : framePath);

	const staticFrames: IFrameData[] = useMemo(
		() => [...new Array(6).keys()].map((_, i) => ({ label: t("labels.static", { i }), value: i })),
		[locale]
	);

	const animatedFrames: IFrameData[] = useMemo(
		() => Array.from({ length: 5 }, (_, i) => i + 6).map(i => ({ label: t("labels.animated", { i }), value: i })),
		[locale]
	);

	useEffect(() => {
		if (framePath) setUrl(framePath);

		if (framePath) {
			const first = framePath.split("/");
			const second = first[first.length - 1].split(".")[0];
			setFrame(framePath.includes("/animated/") ? Number(second) + 5 : Number(second));
		}
	}, [framePath]);

	useEffect(() => {
		if (frame === 0) return setUrl(null);

		if (frame < 6) {
			setUrl(`${EnumStaticRoute.FRAMES}/${frame}.webp`);
		} else {
			setUrl(`${EnumStaticRoute.ANIMATED_FRAMES}/${frame - 5}.png`);
		}
	}, [frame]);

	return {
		frame,
		url,
		staticFrames,
		animatedFrames,
		setFrame,
		t,
	};
};

export const useAvatarFrameDialogPreview = () => {
	const t = useTranslations("global.settings.content.profile.avatar");
	const { updateAvatarFrameAsync, isAvatarFrameUpdating } = useUpdateAvatarFrameS();

	const handleChangeFrame = async (url: string | null) => {
		try {
			await updateAvatarFrameAsync({ framePath: url });

			toast.success(t("toasters.frame"));
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			toast.error(errMsg);
		}
	};

	return {
		t,
		handleChangeFrame,
		isAvatarFrameUpdating,
	};
};
