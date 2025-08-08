import { useVerifyEmailS } from "@/services/hooks/account";
import { EnumAppRoute } from "@constants/routes";
import { useAuth } from "@hooks/auth";
import type { TConfirmationFields } from "@schemas/confirmation.schema";
import type { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useConfirmation } from "./useConfirmation";

export const useEmailConfirmation = (utm_source?: EnumAppRoute) => {
	const limit = 6;

	const { form, dataStatus, setDataStatus, t, timeout, onError, refreshCode, cooldown, isCodeSending } = useConfirmation(limit);
	const { auth } = useAuth();

	const { replace } = useRouter();
	const { isVerifying, verifyEmailAsync } = useVerifyEmailS();

	const isFromSignIn = utm_source === EnumAppRoute.SIGN_IN;
	const isFromAccount = utm_source === EnumAppRoute.ACCOUNT;

	const onSubmit = async (data: TConfirmationFields) => {
		try {
			const { pin, signInAfter } = data;

			await verifyEmailAsync({ token: pin, isNeedAuth: signInAfter });

			toast.success(t("email.toasters.success"));
			clearTimeout(timeout);
			setDataStatus("good");

			return setTimeout(() => {
				replace(isFromAccount ? EnumAppRoute.SETTINGS : EnumAppRoute.INDEX);
				if (signInAfter) auth();
			}, 2000);
		} catch (e) {
			onError(e as AxiosError);
		}
	};

	useEffect(() => {
		if (isFromSignIn || isFromAccount) form.setValue("signInAfter", false);
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
		isFromAccount,
	};
};
