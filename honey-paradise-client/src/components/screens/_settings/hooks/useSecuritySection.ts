import { type TPasswordChangeTwoFields, createChangeTwoPasswordSchema } from "@schemas/password-recovery.schema";

import { errorCatch } from "@/api/api-helper";
import { useUpdatePasswordS } from "@/services/hooks/account";
import { useUpdateSettingsS } from "@/services/hooks/profile";
import type { IUpdateUserSettingsDto } from "@/services/types/profile-service.type";
import { EnumSessionStorageKeys } from "@constants/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@hooks/base";
import type { RefetchOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useSecuritySection = (accRefetch: (opts?: RefetchOptions) => void) => {
	const t = useTranslations("global.settings.content.account.content");

	const { isSettingsUpdating, updateSettingsAsync } = useUpdateSettingsS();

	const onSwitchChange = async (value: boolean, field: keyof IUpdateUserSettingsDto) => {
		try {
			await updateSettingsAsync({ [field]: value });

			accRefetch();
			toast.success("Настройки успешно обновлены!");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);

			toast.error(errMsg);
		}
	};

	const getTitles = () => {
		const tfa_server = t("security.2fa.title").split(" ");
		const fullLogout_server = t("security.fullLogout.title").split(" ");

		tfa_server.shift();
		fullLogout_server.shift();

		return {
			tfa: " " + tfa_server.join(" "),
			fullLogout: " " + fullLogout_server.join(" "),
		};
	};

	return {
		onSwitchChange,
		isSettingsUpdating,
		getTitles,
		t,
	};
};

export const useChangePasswordModal = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { isPasswordUpdating, updatePasswordAsync } = useUpdatePasswordS();

	const defaultValues =
		typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem(EnumSessionStorageKeys.CHANGE_PASSWORD_MODAL) || "{}") : {};

	const schema = createChangeTwoPasswordSchema(() => {});
	const form = useForm<TPasswordChangeTwoFields>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues,
	});

	const onSubmit = async (data: TPasswordChangeTwoFields) => {
		try {
			await updatePasswordAsync({ password: data.password });

			form.reset();
			setIsOpen(false);

			toast.success("Пароль успешно изменен");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);

			toast.error(errMsg);
		}
	};

	useDebounce(
		() => {
			sessionStorage.setItem(EnumSessionStorageKeys.CHANGE_PASSWORD_MODAL, JSON.stringify(form.getValues()));
		},
		300,
		[form.getValues()]
	);

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isOpen,
		setIsOpen,
		isPasswordUpdating,
	};
};
