import { PHONE_MASK_PATTERN } from "@constants/base"
import { zodResolver } from "@hookform/resolvers/zod"
import { useDebounce } from "@hooks/base"
import { useLanguage } from "@i18n/hooks"
import {
	createUpdateUserinfoSchema,
	type TUpdateUserinfoFields
} from "@schemas/update-userinfo.schema"
import { checkPhoneNumber, validateUsername } from "@utils/auth"
import type { AxiosError } from "axios"
import { toDate } from "date-fns"
import type { FactoryArg, InputMask } from "imask"
import { useTranslations } from "next-intl"
import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import type { IDropdownData } from "@/components/ui/components/form-input/types/form-input.type"
import {
	useUniqueFieldCheckS,
	useUpdateProfileS
} from "@/services/hooks/profile"
import { getMaskedPhone } from "@/shared/lib/utils/get-masked-phone"
import { Nullable } from "@/shared/types"
import { GetMeResponseGender, UpdateUserDto } from "@/shared/types/server"

import type { IUniqueFieldsState } from "../types/info-section.type"

export const useInfoSection = (
	gender: GetMeResponseGender | undefined,
	birthdate: string | undefined,
	username: string | undefined,
	phone: string | undefined
) => {
	const defaultValues: TUpdateUserinfoFields = {
		birthdate: birthdate ? toDate(birthdate) : undefined,
		username,
		gender,
		phone: phone ? getMaskedPhone(phone, PHONE_MASK_PATTERN) : undefined
	}

	const t = useTranslations("global.settings.content.profile.personal-info")
	const { locale } = useLanguage(false)

	const [mask, setMask] = useState<InputMask<FactoryArg> | undefined>(undefined)
	const [isDisabled, setIsDisabled] = useState<boolean>(false)
	const [uniqueFields, setUniqueFields] = useState<IUniqueFieldsState>({
		username: null,
		phone: null
	})

	const { isProfileUpdating, updateProfileAsync } = useUpdateProfileS()
	const { checkFieldUniqueAsync, isCheckingUnique } = useUniqueFieldCheckS()

	const schema = createUpdateUserinfoSchema(t)
	const form = useForm<TUpdateUserinfoFields>({
		resolver: zodResolver(schema),
		mode: "onChange",
		values: defaultValues,
		defaultValues
	})

	const checkUnique = async (field: "username" | "phone", value: string) => {
		const isDisabled =
			value.length === 0 ||
			form.formState.defaultValues?.[field] ===
				(field === "phone" ? mask?.value : value)

		if (
			!isDisabled &&
			(field === "username"
				? validateUsername(value, "unique-check")
				: checkPhoneNumber(value))
		) {
			try {
				setUniqueFields(prev => ({ ...prev, [field]: "loading" }))

				await checkFieldUniqueAsync({ field, fieldValue: value })

				setUniqueFields(prev => ({ ...prev, [field]: true }))
			} catch (e) {
				const { errMsg } = errorCatch(e as AxiosError)
				form.setError(field, { message: errMsg })

				setUniqueFields(prev => ({ ...prev, [field]: false }))
			}
		} else setUniqueFields(prev => ({ ...prev, [field]: null }))
	}

	const onSubmit = async (data: TUpdateUserinfoFields) => {
		try {
			const dto: Nullable<UpdateUserDto> = {
				birthdate: data.birthdate?.toISOString() || null,
				gender: data.gender === gender ? undefined : data.gender,
				username: data.username === username ? undefined : data.username,
				phoneNumber:
					getMaskedPhone(phone, PHONE_MASK_PATTERN) === data.phone
						? undefined
						: mask!.unmaskedValue || null
			}

			await updateProfileAsync(dto)

			toast.success(t("toasters.success"))
		} catch (e) {
			console.log(e)
			const { errMsg } = errorCatch(e as AxiosError)
			const msg = t("toasters.error", { e: errMsg })

			toast.error(msg)
		}
	}

	const clearBirthdate = () => {
		if (form.getValues("birthdate")) {
			form.setValue("birthdate", undefined)
		}
	}

	const data: IDropdownData[] = useMemo(
		() => [
			{
				id: GetMeResponseGender.MALE,
				label: t("gender.data.male"),
				value: GetMeResponseGender.MALE
			},
			{
				id: GetMeResponseGender.FEMALE,
				label: t("gender.data.female"),
				value: GetMeResponseGender.FEMALE
			},
			{
				id: GetMeResponseGender.OTHER,
				label: t("gender.data.other"),
				value: GetMeResponseGender.OTHER
			}
		],
		[locale]
	)

	useEffect(() => {
		if (!form.formState.isValid) return setIsDisabled(true)

		for (const key in uniqueFields) {
			if (uniqueFields[key as keyof typeof uniqueFields] === false)
				return setIsDisabled(true)
		}

		const json_default = JSON.stringify(form.formState.defaultValues)
		const json_values = JSON.stringify(form.getValues())

		if (json_default === json_values) return setIsDisabled(true)
		else {
			if (!form.getValues("username")) return setIsDisabled(true)
			else return setIsDisabled(false)
		}
	}, [form.getValues(), uniqueFields])

	useDebounce(
		async () => {
			await checkUnique("username", form.getValues("username") || "")
		},
		200,
		[form.getValues("username")]
	)

	useDebounce(
		async () => {
			await checkUnique("phone", mask?.unmaskedValue || "")
		},
		200,
		[form.getValues("phone")]
	)

	return {
		form,
		setMask,
		isDisabled,
		data,
		onSubmit: form.handleSubmit(onSubmit),
		isProfileUpdating,
		clearBirthdate,
		uniqueFields,
		isCheckingUnique,
		t
	}
}
