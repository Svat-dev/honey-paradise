import { errorCatch } from "@/api/api-helper";
import { useSendPasswordRecoverCodeS } from "@/services/hooks/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPasswordResetSchema, type TPasswordResetFields } from "@schemas/password-recovery.schema";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { TDataStatus } from "../types/type";

export const useResetPassword = () => {
	const errorDelay = 3000;
	const successDelay = 2000;

	const t = useTranslations("global.password-recovery.content.reset");

	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const [cooldown, setCooldown] = useState<number>(0);

	const { isCodeSending, sendPasswordRecoverCodeAsync } = useSendPasswordRecoverCodeS();

	const schema = createPasswordResetSchema(t);

	const form = useForm<TPasswordResetFields>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
		defaultValues: {
			email: "",
		},
	});

	const resendCode = () => {
		setIsSuccess(false);
		setDataStatus("default");
	};

	const onError = (msg: string) => {
		setDataStatus("error");
		toast.error(msg, { duration: errorDelay });

		return setTimeout(() => setDataStatus("default"), errorDelay);
	};

	const onSubmit = async (data: TPasswordResetFields) => {
		try {
			await sendPasswordRecoverCodeAsync(data.email);

			setDataStatus("good");
			toast.success(t("toasters.success"), { duration: successDelay });

			setIsSuccess(true);
			setCooldown(30);
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			const msg = t("toasters.error", { e: errMsg });

			return onError(msg);
		}
	};

	useEffect(() => {
		if (cooldown !== 0) {
			setTimeout(() => setCooldown(prev => prev - 1), 1000);
		}
	}, [cooldown]);

	const _onSubmit = form.handleSubmit(onSubmit);

	return {
		onSubmit: _onSubmit,
		isCodeSending,
		form,
		dataStatus,
		isSuccess,
		resendCode,
		cooldown,
		t,
	};
};
