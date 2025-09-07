import { type TSignInFields, createSignInSchema } from "@schemas/sign-in.schema";

import { errorCatch } from "@/api/api-helper";
import { useCancelTelegramSignInS, useSignInS } from "@/services/hooks/auth";
import { EnumStorageKeys, errorCauses } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/auth";
import { useTheme } from "@hooks/useTheme";
import { useSessionWebsockets } from "@hooks/websockets/useSessionWebsockets";
import { useLanguage } from "@i18n/hooks";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { usePathname, useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { useEffect, useRef, useState } from "react";
import type ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useTranslations } from "use-intl";
import type { TDataStatus } from "../_sign-up/types/sign-up.type";

export const useSignIn = () => {
	const t = useTranslations("global.sign-in.content");
	const { locale } = useLanguage();

	const errorDelay = 5000;
	const successDelay = 2000;

	const { replace, prefetch } = useRouter();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	const { auth } = useAuth();
	const { theme } = useTheme();
	const { isSignInLoading, signIn } = useSignInS();
	const { cancelTgSignIn, isCancelTgSignInLoading } = useCancelTelegramSignInS();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");
	const [isSuccess, setIsSuccess] = useState<boolean>(false);

	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const schema = createSignInSchema(t);

	const form = useForm<TSignInFields>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
		defaultValues: {
			id: "",
			password: "",
		},
	});

	const onRecaptchaChange = (value: string | null) => {
		setRecaptchaValue(value);
		setError(false);
	};

	const onError = (msg: string, reset: boolean = false) => {
		setDataStatus("error");
		setRecaptchaValue(null);
		recaptchaRef.current?.reset();

		if (reset) form.reset();

		toast.error(msg, { duration: errorDelay, style: { maxWidth: "25rem" } });

		return setTimeout(() => setDataStatus("default"), errorDelay);
	};

	const onCancelTgSignIn = async () => {
		try {
			await cancelTgSignIn();
			form.reset();
			toast.success("Вход отменен!");
		} catch (err) {
			const { errMsg } = errorCatch(err as AxiosError);
			onError(errMsg);
		}
	};

	const { connectSocket, isTgSignInLoading } = useSessionWebsockets(msg => onError(msg, true));

	const onSubmit = async (data: TSignInFields) => {
		if (!recaptchaValue) {
			setError(true);
			setDataStatus("error");
			return setTimeout(() => setDataStatus("default"), errorDelay);
		}

		try {
			const { tfa, tg } = await signIn({ dto: data, recaptcha: recaptchaValue });

			if (tfa) {
				if (tg) {
					connectSocket();

					setIsSuccess(true);
					setDataStatus("good");

					toast(t("toasters.checkTg"), { duration: successDelay, icon: "📲" });
					return setTimeout(() => replace(pathname + "?waiting=true"), 1000);
				}

				toast(t("toasters.2fa"), { duration: successDelay, icon: "🔒" });
				prefetch(EnumAppRoute.SIGN_IN_CONFIRMATION);
				setTimeout(() => replace(EnumAppRoute.SIGN_IN_CONFIRMATION), successDelay);
			} else {
				setDataStatus("good");
				toast.success(t("toasters.success"));

				return setTimeout(() => {
					auth();
					replace(EnumAppRoute.INDEX);
				}, successDelay);
			}
		} catch (err) {
			const { errMsg, errCause } = errorCatch(err as AxiosError);

			if (errCause === errorCauses.ACCOUNT_NOT_VERIFIED) {
				onError(errMsg);
				prefetch(`${EnumAppRoute.EMAIL_CONFIRMATION}&utm_source=${EnumAppRoute.SIGN_IN}`);
				return setTimeout(() => replace(`${EnumAppRoute.EMAIL_CONFIRMATION}&utm_source=${EnumAppRoute.SIGN_IN}`), 2500);
			} else {
				const msg = t("toasters.error", { e: errMsg });
				return onError(msg);
			}
		}
	};

	useEffect(() => {
		if (dataStatus === "error" && recaptchaValue) setDataStatus("default");
	}, [recaptchaValue]);

	useEffect(() => {
		if (searchParams.get("waiting") === "true" && Cookies.get(EnumStorageKeys.SOCKET_SESSION_TOKEN)) {
			connectSocket();
			setDataStatus("good");
			setIsSuccess(true);
		} else {
			replace(pathname, { scroll: true });
			setDataStatus("default");
			setIsSuccess(false);
		}
	}, [searchParams.get("waiting"), Cookies.get(EnumStorageKeys.SOCKET_SESSION_TOKEN)]);

	useEffect(() => {
		if (searchParams.get("error") && searchParams.get("error") === "true") {
			const msg = searchParams.get("message") || "";
			const sts = searchParams.get("status") || "";

			toast.error(`Произошла ошибка ${sts}: \n${msg}`);
			return replace(pathname, { scroll: true });
		}
	}, []);

	return {
		t,
		locale,
		theme,
		form,
		onSubmit,
		onCancelTgSignIn,
		error,
		dataStatus,
		onRecaptchaChange,
		isSignInLoading,
		isTgSignInLoading,
		isCancelTgSignInLoading,
		recaptchaRef,
		isSuccess,
	};
};
