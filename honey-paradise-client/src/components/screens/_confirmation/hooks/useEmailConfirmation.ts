import { useSendVerificationCodeS, useVerifyEmailS } from "@/services/hooks/account";
import { useEffect, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import { EnumStorageTokens } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import { useAuth } from "@hooks/auth";
import type { TConfirmationFields } from "@schemas/confirmation.schema";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useConfirmation } from "./useConfirmation";

export const useEmailConfirmation = () => {
	const limit = 6;
	const base_cooldown = 30;

	const { confirmationForm, dataStatus, setDataStatus, t } = useConfirmation(limit);
	const { auth } = useAuth();

	const { isVerifying, verifyEmailAsync } = useVerifyEmailS();
	const { isCodeSending, sendEmailCode } = useSendVerificationCodeS();

	const { replace } = useRouter();
	const [cooldown, setCooldown] = useState<number>(base_cooldown);

	const onError = (err: AxiosError) => {
		const { error } = errorCatch(err);
		const errMsg = error.response?.data.message;

		toast.error(errMsg!);
		setDataStatus("error");

		return setTimeout(() => setDataStatus("default"), 3000);
	};

	const refreshCode = () => {
		try {
			const email = Cookies.get(EnumStorageTokens.CURRENT_EMAIL) || "";

			setCooldown(base_cooldown);
			sendEmailCode(email);
		} catch (error) {
			onError(error as AxiosError);
		}
	};

	const onSubmit = async (data: TConfirmationFields) => {
		try {
			const { pin, signInAfter } = data;

			await verifyEmailAsync({ token: pin, isNeedAuth: signInAfter });

			toast.success("Вы успешно подтвердили свой аккаунт!");
			setDataStatus("good");
			Cookies.remove(EnumStorageTokens.CURRENT_EMAIL);

			return setTimeout(() => {
				replace(EnumAppRoute.INDEX);
				if (signInAfter) auth();
			}, 3000);
		} catch (error) {
			onError(error as AxiosError);
		}
	};

	useEffect(() => {
		if (confirmationForm.formState.errors.pin) confirmationForm.clearErrors("pin");
	}, [confirmationForm.getValues("pin")]);

	useEffect(() => {
		setTimeout(() => {
			if (cooldown === 0) return;

			setCooldown(cooldown - 1);
		}, 1000);
	}, [cooldown]);

	return {
		t,
		dataStatus,
		confirmationForm,
		onSubmit: confirmationForm.handleSubmit(onSubmit),
		limit,
		cooldown,
		refreshCode,
		isLoading: isCodeSending || isVerifying,
	};
};
