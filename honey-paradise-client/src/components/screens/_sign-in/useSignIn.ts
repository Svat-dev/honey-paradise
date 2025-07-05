import { type TSignInFields, createSignInSchema } from "@schemas/sign-in.schema";

import { errorCatch } from "@/api/api-helper";
import { useSignInS } from "@/services/hooks/auth";
import { errorCauses } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/auth";
import { useTheme } from "@hooks/useTheme";
import { useLanguage } from "@i18n/hooks";
import { AxiosError } from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import { useEffect, useRef, useState } from "react";
import type ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";
import type { TDataStatus } from "../_sign-up/types/sign-up.type";

export const useSignIn = () => {
	const { locale } = useLanguage();
	const t = useTranslations("global.sign-in.content");
	const errorDelay = 5000;

	const { auth } = useAuth();
	const { replace } = useRouter();
	const { theme } = useTheme();
	const { isSignInLoading, signIn } = useSignInS();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");

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

	const onError = (msg: string) => {
		setDataStatus("error");
		toast.error(msg, { duration: errorDelay, style: { maxWidth: "25rem" } });

		return setTimeout(() => {
			setDataStatus("default");

			setRecaptchaValue(null);
			recaptchaRef.current?.reset();
		}, errorDelay);
	};

	const onSubmit = async (data: TSignInFields) => {
		if (!recaptchaValue) {
			setError(true);
			setDataStatus("error");
			return setTimeout(() => setDataStatus("default"), errorDelay);
		}

		try {
			await signIn({ dto: data, recaptcha: recaptchaValue });

			auth();
			setDataStatus("good");
			toast.success(t("toasters.success"));

			return setTimeout(() => {
				setDataStatus("default");
				replace(EnumAppRoute.INDEX);
			}, 2000);
		} catch (err) {
			const { errMsg, errCause } = errorCatch(err as AxiosError);

			if (errCause === errorCauses.ACCOUNT_NOT_VERIFIED) {
				onError(errMsg);
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

	return {
		t,
		locale,
		theme,
		form,
		onSubmit,
		error,
		dataStatus,
		onRecaptchaChange,
		isSignInLoading,
		recaptchaRef,
	};
};
