import { type TSignInFields, createSignInSchema } from "@schemas/sign-in.schema";

import { errorCatch } from "@/api/api-helper";
import { useSignInS } from "@/services/hooks/auth";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/auth";
import { useTheme } from "@hooks/useTheme";
import { useLanguage } from "@i18n/hooks";
import { AxiosError } from "axios";
import { useRouter } from "next/dist/client/components/navigation";
import { useRef, useState } from "react";
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
	const { isSignInLoading, signIn, isSignedIn } = useSignInS();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");

	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const signInSchema = createSignInSchema(t);

	const signInForm = useForm<TSignInFields>({
		resolver: zodResolver(signInSchema),
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
		toast.error(msg, { duration: errorDelay, style: { width: "100%", maxWidth: "25rem" } });

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
			const { errMsg } = errorCatch(err as AxiosError);
			const msg = t("toasters.error", { e: errMsg });

			return onError(msg);
		}
	};

	return {
		t,
		locale,
		theme,
		signInForm,
		onSubmit,
		error,
		dataStatus,
		onRecaptchaChange,
		isSignInLoading,
		recaptchaRef,
	};
};
