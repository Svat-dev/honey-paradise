import { type TSignInFields, createSignInSchema } from "@schemas/sign-in.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@hooks/useTheme";
import { useLocale } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "use-intl";
import type { TDataStatus } from "../_sign-up/types/sign-up.type";

export const useSignIn = () => {
	const { theme } = useTheme();
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

	const onRecaptchaChange = (value: string | null) => {
		setRecaptchaValue(value);
		setError(false);
	};

	const onSubmit = (data: TSignInFields) => {
		if (!recaptchaValue) {
			setError(true);
			setDataStatus("error");
			return setTimeout(() => setDataStatus("default"), 3000);
		}

		setDataStatus("good");
		setTimeout(() => setDataStatus("default"), 3000);

		console.log(data);
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
	};
};
