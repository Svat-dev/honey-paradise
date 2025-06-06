import { type TSignUpFields, createSignUpSchema } from "@/shared/lib/schemas/sign-up.schema";
import type { IIsActive, TCurrentPart, TDataStatus } from "./types/sign-up.type";

import type { TSearchParams } from "@/shared/types/base.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const useSignUp = (searchParams: TSearchParams) => {
	const t = useTranslations("global.sign-up.content");
	const { push } = useRouter();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [isError, setIsError] = useState<boolean>(false);

	const [currentPart, setCurrentPart] = useState<TCurrentPart>((searchParams.activeTab as any) || "main");
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");
	const [isActive, setIsActive] = useState<IIsActive>({
		main: currentPart === "main",
		optional: currentPart === "optional",
	});

	const signUpSchema = createSignUpSchema(t);

	const signUpForm = useForm<TSignUpFields>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
		defaultValues: {
			confirmPassword: "",
			password: "",
			email: "",
			birthdate: undefined,
			gender: "other",
			username: "",
		},
	});

	const onClickToNext = () => {
		setIsActive(prev => ({ ...prev, main: false, optional: true }));
		setTimeout(() => {
			setCurrentPart("optional");
			push(`?activeTab=optional`);
		}, 400);
	};

	const onClickToPrevious = () => {
		setIsActive(prev => ({ ...prev, optional: false, main: true }));
		setTimeout(() => {
			setCurrentPart("main");
			push(`?activeTab=main`);
		}, 400);
	};

	const onRecaptchaChange = (token: string | null) => {
		setRecaptchaValue(token);
		setIsError(false);
	};

	const onSubmit = (data: any) => {
		if (!recaptchaValue) {
			setIsError(true);
			setDataStatus("error");
			return setTimeout(() => setDataStatus("default"), 3000);
		}

		setDataStatus("good");
		setTimeout(() => setDataStatus("default"), 3000);

		console.log(data);
	};

	return {
		dataStatus,
		isActive,
		isError,
		onSubmit,
		onRecaptchaChange,
		onClickToNext,
		onClickToPrevious,
		signUpForm,
		currentPart,
	};
};
