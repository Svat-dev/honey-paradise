import { useConnectTgS, useDisconnectTgS, useGetTelegramInfoS } from "@/services/hooks/account";

import type { AxiosError } from "axios";
import { errorCatch } from "@/api/api-helper";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

export const useTelegramSection = () => {
	const t = useTranslations("global.settings.content.profile.telegram-linking");
	const dt = useTranslations("global.settings.content.profile.modals");

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

	const { push } = useRouter();
	const { telegramInfo, isTelegramInfoLoading, telegramRefetch } = useGetTelegramInfoS();
	const { connectTgAsync, isTgConnecting } = useConnectTgS();
	const { disconnectTgAsync, isTgDisconnecting } = useDisconnectTgS();

	const tgBotLink = process.env.TELEGRAM_BOT_URL;
	const tgUserLink = `https://t.me/${telegramInfo?.tgUsername}`;

	const limit = 3;

	const handleConnect = async () => {
		try {
			const { url } = await connectTgAsync();

			setRedirectUrl(url);
			setIsOpen(true);
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			toast.error(errMsg);
		}
	};

	const handleDisconnect = async () => {
		try {
			await disconnectTgAsync();

			toast.success("Телеграм аккаунт успешно отвязан");
			telegramRefetch();
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			toast.error(errMsg);
		}
	};

	const onCancel = () => {
		setRedirectUrl(null);
		setIsOpen(false);
	};

	const onComplete = () => (redirectUrl ? push(redirectUrl) : onCancel());

	return {
		tgBotLink,
		tgUserLink,
		isOpen,
		isTelegramInfoLoading,
		limit,
		handleConnect,
		handleDisconnect,
		onCancel,
		t,
		dt,
		isTgConnecting,
		onComplete,
		telegramInfo,
		telegramRefetch,
		isTgDisconnecting,
	};
};
