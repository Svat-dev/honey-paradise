import { type TSignInFields, createSignInSchema } from "@schemas/sign-in.schema";

import { errorCatch } from "@/api/api-helper";
import { authService } from "@/services/auth.service";
import { EnumErrorMsgCodes } from "@/shared/lib/constants/base";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@hooks/auth";
import { useTheme } from "@hooks/useTheme";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";
import type { TDataStatus } from "../_sign-up/types/sign-up.type";
import { ISignInMutateData } from "./types/sign-in.type";

export const useSignIn = () => {
	const locale = useLocale();
	const et = useTranslations("server.errors");
	const t = useTranslations("global.sign-in.content");

	const { auth } = useAuth();
	const { replace } = useRouter();
	const { theme } = useTheme();

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

	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["sign in"],
		mutationFn: (data: ISignInMutateData) => authService.signIn(data.dto, data.recaptcha),
	});

	const onRecaptchaChange = (value: string | null) => {
		setRecaptchaValue(value);
		setError(false);
	};

	const onError = (msg: string) => {
		setDataStatus("error");
		toast.error(msg);

		return setTimeout(() => {
			setDataStatus("default");

			setRecaptchaValue(null);
			recaptchaRef.current?.reset();
		}, 3000);
	};

	const onSubmit = async (data: TSignInFields) => {
		if (!recaptchaValue) {
			setError(true);
			setDataStatus("error");
			return setTimeout(() => setDataStatus("default"), 3000);
		}

		setDataStatus("good");
		setTimeout(() => setDataStatus("default"), 3000);

		try {
			await mutateAsync({ dto: data, recaptcha: recaptchaValue });

			auth();
			setDataStatus("good");
			toast.success(t("toasters.success"));

			return setTimeout(() => {
				setDataStatus("default");
				replace(EnumAppRoute.INDEX);
			}, 2000);
		} catch (err) {
			const { msgCode } = errorCatch(err as AxiosError);

			if (msgCode === EnumErrorMsgCodes.SERVER_ERROR) et("500");

			const errMsg = et(msgCode);
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
		isPending,
		recaptchaRef,
	};
};
