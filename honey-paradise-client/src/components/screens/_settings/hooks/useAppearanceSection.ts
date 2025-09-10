import { createUpdateAppearanceSchema, type TUpdateAppearanceFields } from "@/shared/lib/schemas/update-appearance.schema";
import { useEffect, useMemo, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import type { IDropdownData } from "@/components/ui/components/form-input/types/form-input.type";
import { useUpdateSettingsS } from "@/services/hooks/profile";
import { EnumLanguages } from "@/shared/lib/i18n";
import { GetMySettingsResponseDefaultTheme, type GetMySettingsResponse } from "@/shared/types/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLanguage } from "@i18n/hooks";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

export const useAppearanceSection = (settings: GetMySettingsResponse | undefined) => {
	const t = useTranslations("global.settings.content.profile");
	const { locale } = useLanguage();

	const { updateSettingsAsync, isSettingsUpdating } = useUpdateSettingsS();

	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const schema = createUpdateAppearanceSchema();
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

			toast.success(t("appearance.toasters.success"));
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			const msg = t("appearance.toasters.success", { e: errMsg });

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

	const language_data: IDropdownData[] = useMemo(
		() => [
			{ id: EnumLanguages.RU, value: EnumLanguages.RU, label: t("appearance.language.ru") },
			{ id: EnumLanguages.EN, value: EnumLanguages.EN, label: t("appearance.language.en") },
		],
		[locale]
	);

	const theme_data: IDropdownData[] = useMemo(
		() => [
			{ id: GetMySettingsResponseDefaultTheme.DARK, value: GetMySettingsResponseDefaultTheme.DARK, label: t("appearance.theme.dark") },
			{ id: GetMySettingsResponseDefaultTheme.LIGHT, value: GetMySettingsResponseDefaultTheme.LIGHT, label: t("appearance.theme.light") },
		],
		[locale]
	);

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
		t,
	};
};
