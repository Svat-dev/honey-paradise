import { EnumStorageTokens, errorCauses } from "@constants/base";
import { useEffect, useState } from "react";
import { useSendVerificationCodeS, useVerifyEmailS } from "@/services/hooks/account";

import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { EnumAppRoute } from "@constants/routes";
import type { TConfirmationFields } from "@schemas/confirmation.schema";
import { errorCatch } from "@/api/api-helper";
import toast from "react-hot-toast";
import { useAuth } from "@hooks/auth";
import { useConfirmation } from "./useConfirmation";
import { useRouter } from "next/navigation";

export const useEmailConfirmation = (utm_source?: EnumAppRoute) => {
	const limit = 6;
	const base_cooldown = 30;
	const errorDelay = 4000;

	const { form, dataStatus, setDataStatus, t } = useConfirmation(limit);
	const { auth } = useAuth();

	const { isVerifying, verifyEmailAsync } = useVerifyEmailS();
	const { isCodeSending, sendEmailCode } = useSendVerificationCodeS();

	const { replace } = useRouter();
	const [cooldown, setCooldown] = useState<number>(base_cooldown);
	const [timeout, _setTimeout] = useState<NodeJS.Timeout>();

	const isFromSignIn = utm_source === EnumAppRoute.SIGN_IN;

	const onError = (err: AxiosError) => {
		const { errMsg, errCause } = errorCatch(err);

		if (errCause === errorCauses.VERIFICATION_TOKEN_EXPIRED) {
			setCooldown(0);
			clearTimeout(timeout);
		}

		toast.error(errMsg, { duration: errorDelay });
		setDataStatus("error");

		return setTimeout(() => setDataStatus("default"), errorDelay);
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

			toast.success(t("email.toasters.success"));
			clearTimeout(timeout);
			Cookies.remove(EnumStorageTokens.CURRENT_EMAIL);
			setDataStatus("good");

			return setTimeout(() => {
				replace(EnumAppRoute.INDEX);
				if (signInAfter) auth();
			}, 2000);
		} catch (error) {
			onError(error as AxiosError);
		}
	};

	useEffect(() => {
		if (form.formState.errors.pin) form.clearErrors("pin");
	}, [form.getValues("pin")]);

	useEffect(() => {
		_setTimeout(
			setTimeout(() => {
				if (cooldown === 0) return;
				setCooldown(cooldown - 1);
			}, 1000)
		);
	}, [cooldown]);

	useEffect(() => {
		if (isFromSignIn) {
			form.setValue("signInAfter", false);
		}
	}, []);

	return {
		t,
		dataStatus,
		form,
		onSubmit: form.handleSubmit(onSubmit),
		limit,
		cooldown,
		refreshCode,
		isLoading: isCodeSending || isVerifying,
		isFromSignIn,
	};
};
