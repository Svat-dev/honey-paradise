import { type TPasswordChangeFields, createChangePasswordSchema } from "@/shared/lib/schemas/password-recovery.schema";

import { errorCatch } from "@/api/api-helper";
import { useUpdatePasswordS } from "@/services/hooks/profile";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { TDataStatus } from "../types/type";

export const useChangePassword = (token: string) => {
	const errorDelay = 4000;
	const successDelay = 2000;

	const t = useTranslations("global.password-recovery.content.change");
	const { replace } = useRouter();

	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");

	const { isPasswordUpdating, updatePasswordAsync } = useUpdatePasswordS();

	const schema = createChangePasswordSchema(t);

	const form = useForm<TPasswordChangeFields>({
		resolver: zodResolver(schema),
		mode: "onSubmit",
		defaultValues: {
			password: "",
		},
	});

	const onError = (msg: string) => {
		setDataStatus("error");
		toast.error(msg, { duration: errorDelay });

		return setTimeout(() => setDataStatus("default"), errorDelay);
	};

	const onSubmit = async (data: TPasswordChangeFields) => {
		try {
			await updatePasswordAsync({ password: data.password, token });

			setDataStatus("good");
			toast.success(t("toasters.success"), { duration: successDelay });

			setTimeout(() => {
				setDataStatus("default");
				replace(EnumAppRoute.SIGN_IN);
			}, successDelay);
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			const msg = t("toasters.error", { e: errMsg });

			return onError(msg);
		}
	};

	const _onSubmit = form.handleSubmit(onSubmit);

	return {
		dataStatus,
		onSubmit: _onSubmit,
		form,
		isPasswordUpdating,
		t,
	};
};
