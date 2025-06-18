import { type TSignUpFields, createSignUpSchema } from "@schemas/sign-up.schema";

import { errorCatch } from "@/api/api-helper";
import { useCreateAccountS } from "@/services/hooks/auth";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import type { TSearchParams } from "@/shared/types/base.type";
import { EnumGenders } from "@/shared/types/models";
import { EnumStorageTokens } from "@constants/base";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useRouter } from "next/dist/client/components/navigation";
import { useRef, useState } from "react";
import type ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { IIsActive, TCurrentPart, TDataStatus } from "../types/sign-up.type";

export const useSignUp = (searchParams: TSearchParams) => {
	const t = useTranslations("global.sign-up.content");
	const errorDelay = 5000;

	const { push, replace } = useRouter();
	const { createAcc, isCreateAccLoading } = useCreateAccountS();

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
	const [isError, setIsError] = useState<boolean>(false);

	const [currentPart, setCurrentPart] = useState<TCurrentPart>((searchParams.activeTab as any) || "main");
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");
	const [isActive, setIsActive] = useState<IIsActive>({
		main: currentPart === "main",
		optional: currentPart === "optional",
	});

	const recaptchaRef = useRef<ReCAPTCHA>(null);

	const signUpSchema = createSignUpSchema(t);

	const signUpForm = useForm<TSignUpFields>({
		resolver: zodResolver(signUpSchema),
		mode: "onChange",
		defaultValues: {
			confirmPassword: "",
			password: "",
			email: "",
			birthdate: undefined,
			gender: EnumGenders.OTHER,
			username: undefined,
		},
	});

	const isDisabled = () => {
		const isPassValid = !signUpForm.getFieldState("password").invalid && signUpForm.getValues("password").length !== 0;
		const isEmailValid = !signUpForm.getFieldState("email").invalid && signUpForm.getValues("email").length !== 0;
		const isConfPassValid = !signUpForm.getFieldState("confirmPassword").invalid && signUpForm.getValues("confirmPassword").length !== 0;

		return !isPassValid || !isEmailValid || !isConfPassValid || dataStatus !== "default";
	};

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

	const onError = (msg: string) => {
		setDataStatus("error");
		toast.error(msg, { duration: errorDelay, style: { width: "100%", maxWidth: "25rem" } });

		return setTimeout(() => {
			setDataStatus("default");

			setRecaptchaValue(null);
			recaptchaRef.current?.reset();
		}, errorDelay);
	};

	const onSubmit = async (data: TSignUpFields) => {
		if (!recaptchaValue) {
			setIsError(true);
			setDataStatus("error");
			return setTimeout(() => setDataStatus("default"), errorDelay);
		}

		try {
			const { confirmPassword, ..._data } = data;
			await createAcc({ recaptcha: recaptchaValue, dto: { ..._data, birthdate: _data.birthdate?.toISOString() } });

			setDataStatus("good");
			toast.success(t("toasters.success"));
			Cookies.set(EnumStorageTokens.CURRENT_EMAIL, _data.email);

			return setTimeout(() => {
				setDataStatus("default");
				replace(EnumAppRoute.EMAIL_CONFIRMATION);
			}, 2000);
		} catch (err) {
			const { errMsg } = errorCatch(err as AxiosError);
			const msg = t("toasters.error", { e: errMsg });
			return onError(msg);
		}
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
		isCreateAccLoading,
		isDisabled: isDisabled(),
		recaptchaRef,
		t,
	};
};
