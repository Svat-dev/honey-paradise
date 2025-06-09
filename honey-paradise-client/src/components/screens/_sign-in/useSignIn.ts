import { type TSignInFields, createSignInSchema } from "@schemas/sign-in.schema";

import { errorCatch } from "@/api/api-helper";
import { authService } from "@/services/auth.service";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@hooks/useTheme";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "use-intl";
import type { TDataStatus } from "../_sign-up/types/sign-up.type";
import { ISignInMutateData } from "./types/sign-in.type";

export const useSignIn = () => {
	const { theme } = useTheme();
	const { replace } = useRouter();
	const locale = useLocale();
	const t = useTranslations("global.sign-in.content");

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");

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

			setDataStatus("good");
			toast.success(t("toasters.success"));

			return setTimeout(() => {
				setDataStatus("default");
				replace(EnumAppRoute.INDEX);
			}, 3000);
		} catch (err) {
			const { error } = errorCatch(err as AxiosError);

			setDataStatus("error");

			if (error.response?.status === 500) toast.error(t("toasters.error.server", { code: error.response.status }));
			else toast.error(t("toasters.error.client"));

			return setTimeout(() => setDataStatus("default"), 3000);
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
	};
};
