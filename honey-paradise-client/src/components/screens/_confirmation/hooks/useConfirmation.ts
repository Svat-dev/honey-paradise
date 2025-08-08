import { errorCatch } from "@/api/api-helper";
import { useSendVerificationCodeS } from "@/services/hooks/account";
import { useSendTFACodeS } from "@/services/hooks/auth";
import { EnumStorageKeys, errorCauses } from "@constants/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { createConfirmationSchema, type TConfirmationFields } from "@schemas/confirmation.schema";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { TDataStatus } from "../types/confirmation.type";

export const useConfirmation = (value: 4 | 6) => {
	const errorDelay = 4000;
	const base_cooldown = 30;

	const t = useTranslations("global.confirmation.content");

	const [cooldown, setCooldown] = useState<number>(base_cooldown);
	const [timeout, _setTimeout] = useState<NodeJS.Timeout>();
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");

	const { isCodeSending, sendEmailCodeAsync } = useSendVerificationCodeS();
	const { isTFACodeSending, sendTFACodeAsync } = useSendTFACodeS();

	const schema = createConfirmationSchema(t, value);

	const form = useForm<TConfirmationFields>({
		resolver: zodResolver(schema),
		defaultValues: {
			pin: "",
			signInAfter: true,
		},
		mode: "onSubmit",
	});

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

	const refreshCode = async () => {
		try {
			const email = Cookies.get(EnumStorageKeys.CURRENT_EMAIL) || "";

			if (value === 4) await sendTFACodeAsync();
			else if (value === 6) await sendEmailCodeAsync(email);
			else throw new Error("Error 500. Cant refresh code");

			setCooldown(base_cooldown);
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

	return { dataStatus, t, form, setDataStatus, onError, refreshCode, isCodeSending, isTFACodeSending, cooldown, timeout };
};
