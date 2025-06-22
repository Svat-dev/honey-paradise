import { type TPasswordChangeFields, createChangePasswordSchema } from "@/shared/lib/schemas/password-recovery.schema";

import { errorCatch } from "@/api/api-helper";
import { useUpdatePasswordS } from "@/services/hooks/profile/useUpdatePasswordS";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { TDataStatus } from "../types/type";

export const useChangePassword = (token: string) => {
	const errorDelay = 4000;
	const successDelay = 2000;

	const [dataStatus, setDataStatus] = useState<TDataStatus>("default");

	const { isPasswordUpdating, updatePasswordAsync } = useUpdatePasswordS();

	const changePasswordSchema = createChangePasswordSchema({});

	const changePasswordForm = useForm<TPasswordChangeFields>({
		resolver: zodResolver(changePasswordSchema),
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
			toast.success("Вы успешно изменили свой пароль", { duration: successDelay });

			setTimeout(() => {
				setDataStatus("default");
			}, successDelay);
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			const msg = "Ошибка при обновлении пароля " + errMsg;

			return onError(msg);
		}
	};

	const _onSubmit = changePasswordForm.handleSubmit(onSubmit);

	return {
		dataStatus,
		onSubmit: _onSubmit,
		changePasswordForm,
		isPasswordUpdating,
	};
};
