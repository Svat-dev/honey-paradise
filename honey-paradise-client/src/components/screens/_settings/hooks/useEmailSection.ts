import { type TUpdateEmailFields, createUpdateEmailSchema } from "@schemas/update-email.schema";
import { useEffect, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import { useSendVerificationCodeS, useUpdateEmailS } from "@/services/hooks/account";
import { useUniqueFieldCheckS } from "@/services/hooks/profile";
import { EnumStorageKeys } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@hooks/base";
import type { RefetchOptions } from "@tanstack/react-query";
import { checkEmail } from "@utils/auth";
import type { AxiosError } from "axios";
import Cookies from "js-cookie";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export const useEmailSection = (email: string | undefined, accRefetch: (opts?: RefetchOptions) => void) => {
	const t = useTranslations("global.settings.content.account.content");
	const { push } = useRouter();

	const { checkFieldUniqueAsync, isCheckingUnique } = useUniqueFieldCheckS();
	const { updateEmailAsync, isEmailUpdating } = useUpdateEmailS();
	const { sendEmailCode } = useSendVerificationCodeS();

	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [emailUnique, setEmailUnique] = useState<boolean | "loading" | null>(null);

	const schema = createUpdateEmailSchema(t);
	const form = useForm<TUpdateEmailFields>({
		resolver: zodResolver(schema),
		mode: "onChange",
		values: { email: email || "" },
		defaultValues: { email },
	});

	const resetFields = () => form.reset();

	const confirmEmail = () => {
		Cookies.set(EnumStorageKeys.CURRENT_EMAIL, email!, {
			sameSite: "lax",
			domain: process.env.NEXT_PUBLIC_DOMAIN,
			expires: 0.25,
			path: EnumAppRoute.INDEX,
		});

		sendEmailCode();

		push(`${EnumAppRoute.EMAIL_CONFIRMATION}&utm_source=${EnumAppRoute.ACCOUNT}`);
	};

	const onSubmit = async (data: TUpdateEmailFields) => {
		try {
			await updateEmailAsync(data.email);

			accRefetch();
			setIsDisabled(true);

			toast.success(t("toasters.email.success"));
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);

			toast.error(errMsg);
		}
	};

	useEffect(() => {
		if (emailUnique === false) return setIsDisabled(true);

		const value = form.getValues("email");

		if (value === form.formState.defaultValues?.email || !checkEmail(value)) return setIsDisabled(true);
		else return setIsDisabled(false);
	}, [form.getValues("email"), emailUnique]);

	useDebounce(
		async () => {
			const value = form.getValues("email");
			const isDisabled = value.length === 0 || !checkEmail(value, "unique-check") || form.formState.defaultValues?.email === value;

			if (!isDisabled) {
				try {
					setEmailUnique("loading");

					await checkFieldUniqueAsync({ field: "email", fieldValue: value });

					setEmailUnique(true);
				} catch (e) {
					const { errMsg } = errorCatch(e as AxiosError);
					form.setError("email", { message: errMsg });

					setEmailUnique(false);
				}
			} else setEmailUnique(null);
		},
		200,
		[form.getValues("email")]
	);

	return {
		onSubmit: form.handleSubmit(onSubmit),
		form,
		isDisabled,
		isCheckingUnique,
		emailUnique,
		resetFields,
		confirmEmail,
		isEmailUpdating,
		t,
	};
};
