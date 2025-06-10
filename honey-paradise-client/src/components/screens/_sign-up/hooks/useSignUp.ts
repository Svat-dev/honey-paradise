import { type TSignUpFields, createSignUpSchema } from "@schemas/sign-up.schema";

import { errorCatch } from "@/api/api-helper";
import { authService } from "@/services/auth.service";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import type { TSearchParams } from "@/shared/types/base.type";
import { EnumGenders } from "@/shared/types/models";
import { EnumErrorMsgCodes } from "@constants/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { ICreateAccountMutateData, IIsActive, TCurrentPart, TDataStatus } from "../types/sign-up.type";

export const useSignUp = (searchParams: TSearchParams) => {
	const t = useTranslations("global.sign-up.content");
	const et = useTranslations("server.errors");
	const { push, replace } = useRouter();

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

	const { isPending, mutateAsync } = useMutation({
		mutationKey: ["create account"],
		mutationFn: (data: ICreateAccountMutateData) => authService.createAccount(data.dto, data.recaptcha),
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
		toast.error(msg);

		return setTimeout(() => {
			setDataStatus("default");

			setRecaptchaValue(null);
			recaptchaRef.current?.reset();
		}, 3000);
	};

	const onSubmit = async (data: TSignUpFields) => {
		if (!recaptchaValue) {
			setIsError(true);
			setDataStatus("error");
			return setTimeout(() => setDataStatus("default"), 3000);
		}

		try {
			const { confirmPassword, ..._data } = data;
			await mutateAsync({ recaptcha: recaptchaValue, dto: { ..._data, birthdate: _data.birthdate?.toISOString() } });

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
		dataStatus,
		isActive,
		isError,
		onSubmit,
		onRecaptchaChange,
		onClickToNext,
		onClickToPrevious,
		signUpForm,
		currentPart,
		isPending,
		isDisabled: isDisabled(),
		recaptchaRef,
		t,
	};
};
