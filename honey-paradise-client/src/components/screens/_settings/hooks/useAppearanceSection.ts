import { type TUpdateAppearanceFields, createUpdateAppearanceSchema } from "@/shared/lib/schemas/update-appearance.schema";
import { EnumThemes, type ISettings } from "@/shared/types/models";
import { useEffect, useId, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import type { IDropdownData } from "@/components/ui/form-input/types/form-input.type";
import { useUpdateSettingsS } from "@/services/hooks/profile";
import { EnumLanguages } from "@/shared/lib/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import type { RefetchOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const useAppearanceSection = (settings: ISettings | undefined, refetch: (opts?: RefetchOptions) => void) => {
	const { updateSettingsAsync, isSettingsUpdating } = useUpdateSettingsS();

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const schema = createUpdateAppearanceSchema({});
	const form = useForm<TUpdateAppearanceFields>({
		resolver: zodResolver(schema),
		mode: "onChange",
		values: {
			theme: settings?.defaultTheme,
			language: settings?.defaultLanguage,
		},
		defaultValues: {
			theme: settings?.defaultTheme,
			language: settings?.defaultLanguage,
		},
	});

	const onSubmit = async (data: TUpdateAppearanceFields) => {
		try {
			const { language, theme } = data;

			await updateSettingsAsync({ defaultLanguage: language, defaultTheme: theme });

			refetch();
			toast.success("Данные успешно сохранены");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			const msg = errMsg;

			toast.error(msg);
		}
	};

	const clearValues = (field: keyof TUpdateAppearanceFields) => {
		if (field === "language") {
			if (settings?.defaultLanguage) form.setValue(field, null);
			else form.setValue(field, undefined);
		} else {
			if (settings?.defaultTheme) form.setValue(field, null);
			else form.setValue(field, undefined);
		}
	};

	const language_data: IDropdownData[] = [
		{ id: useId(), value: EnumLanguages.RU, label: "Русский" },
		{ id: useId(), value: EnumLanguages.EN, label: "Английский" },
	];

	const theme_data: IDropdownData[] = [
		{ id: useId(), value: EnumThemes.DARK, label: "Темная" },
		{ id: useId(), value: EnumThemes.LIGHT, label: "Светлая" },
	];

	useEffect(() => {
		const json_default = JSON.stringify(form.formState.defaultValues);
		const json_values = JSON.stringify(form.getValues());

		if (json_default === json_values) return setIsDisabled(true);
		else setIsDisabled(false);
	}, [form.getValues()]);

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		clearValues,
		language_data,
		theme_data,
		isDisabled,
		isSettingsUpdating,
	};
};
