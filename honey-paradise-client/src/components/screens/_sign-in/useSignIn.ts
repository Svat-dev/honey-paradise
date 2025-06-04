import { type TSignInFields, signInSchema } from "@schemas/sign-in.schema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "@hooks/useTheme";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignIn = () => {
	const { theme } = useTheme();
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [error, setError] = useState<boolean>(false);
	const [dataStatus, setDataStatus] = useState<"default" | "error" | "good">("default");

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
		return setTimeout(() => setDataStatus("default"), 3000);
	};

	return {
		theme,
		signInForm,
		onSubmit,
		error,
		dataStatus,
		onRecaptchaChange,
	};
};
