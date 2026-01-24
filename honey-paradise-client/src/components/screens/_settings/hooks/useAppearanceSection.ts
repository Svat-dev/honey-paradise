import { zodResolver } from "@hookform/resolvers/zod"
import { useLanguage } from "@i18n/hooks"
import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import type { IDropdownData } from "@/components/ui/components/form-input/types/form-input.type"
import { useUpdateSettingsS } from "@/services/hooks/profile"
import { EnumLanguages } from "@/shared/lib/i18n"
import {
	createUpdateAppearanceSchema,
	type TUpdateAppearanceFields
} from "@/shared/lib/schemas/update-appearance.schema"
import {
	type GetMySettingsResponse,
	GetMySettingsResponseDefaultCurrency,
	GetMySettingsResponseDefaultTheme
} from "@/shared/types/server"

export const useAppearanceSection = (
	settings: GetMySettingsResponse | undefined
) => {
	const t = useTranslations("global.settings.content.profile")
	const { locale } = useLanguage(false)

	const { updateSettingsAsync, isSettingsUpdating } = useUpdateSettingsS()

	const [isDisabled, setIsDisabled] = useState<boolean>(false)

	const schema = createUpdateAppearanceSchema()
	const form = useForm<TUpdateAppearanceFields>({
		resolver: zodResolver(schema),
		mode: "onChange",
		values: {
			theme: settings?.defaultTheme,
			language: settings?.defaultLanguage,
			currency: settings?.defaultCurrency
		},
		defaultValues: {
			theme: settings?.defaultTheme,
			language: settings?.defaultLanguage,
			currency: settings?.defaultCurrency
		}
	})

	const onSubmit = async (data: TUpdateAppearanceFields) => {
		try {
			const { language, theme, currency } = data

			await updateSettingsAsync({
				defaultLanguage: language,
				defaultTheme: theme,
				defaultCurrency: currency
			})

			toast.success(t("appearance.toasters.success"))
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError)
			const msg = t("appearance.toasters.success", { e: errMsg })

			toast.error(msg)
		}
	}

	const clearValues = (field: keyof TUpdateAppearanceFields) => {
		switch (field) {
			case "language":
				if (settings?.defaultLanguage) form.setValue(field, null)
				else form.setValue(field, undefined)
				break
			case "currency":
				if (settings?.defaultCurrency) form.setValue(field, null)
				else form.setValue(field, undefined)
				break
			case "theme":
				if (settings?.defaultTheme) form.setValue(field, null)
				else form.setValue(field, undefined)
				break
			default:
				break
		}
	}

	const language_data: IDropdownData[] = useMemo(
		() => [
			{
				id: EnumLanguages.RU,
				value: EnumLanguages.RU,
				label: t("appearance.language.ru")
			},
			{
				id: EnumLanguages.EN,
				value: EnumLanguages.EN,
				label: t("appearance.language.en")
			}
		],
		[locale]
	)

	const theme_data: IDropdownData[] = useMemo(
		() => [
			{
				id: GetMySettingsResponseDefaultTheme.DARK,
				value: GetMySettingsResponseDefaultTheme.DARK,
				label: t("appearance.theme.dark")
			},
			{
				id: GetMySettingsResponseDefaultTheme.LIGHT,
				value: GetMySettingsResponseDefaultTheme.LIGHT,
				label: t("appearance.theme.light")
			}
		],
		[locale]
	)

	const currency_data: IDropdownData[] = useMemo(
		() => [
			{
				id: GetMySettingsResponseDefaultCurrency.DOLLAR,
				value: GetMySettingsResponseDefaultCurrency.DOLLAR,
				label: t("appearance.currency.dollar")
			},
			{
				id: GetMySettingsResponseDefaultCurrency.EURO,
				value: GetMySettingsResponseDefaultCurrency.EURO,
				label: t("appearance.currency.euro")
			},
			{
				id: GetMySettingsResponseDefaultCurrency.RUBLE,
				value: GetMySettingsResponseDefaultCurrency.RUBLE,
				label: t("appearance.currency.ruble")
			}
		],
		[locale]
	)

	useEffect(() => {
		const json_default = JSON.stringify(form.formState.defaultValues)
		const json_values = JSON.stringify(form.getValues())

		if (json_default === json_values) return setIsDisabled(true)
		else setIsDisabled(false)
	}, [form.getValues()])

	return {
		form,
		onSubmit: form.handleSubmit(onSubmit),
		clearValues,
		language_data,
		theme_data,
		currency_data,
		isDisabled,
		isSettingsUpdating,
		t
	}
}
