import { errorCatch } from "@/api/api-helper";
import type { IDropdownData } from "@/components/ui/components/form-input/types/form-input.type";
import { useUniqueFieldCheckS, useUpdateProfileS } from "@/services/hooks/profile";
import type { IUpdateProfileDto } from "@/services/types/profile-service.type";
import { EnumGenders } from "@/shared/types/models";
import { PHONE_MASK_PATTERN } from "@constants/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@hooks/base";
import { type TUpdateUserinfoFields, createUpdateUserinfoSchema } from "@schemas/update-userinfo.schema";
import type { RefetchOptions } from "@tanstack/react-query";
import { checkPhoneNumber, validateUsername } from "@utils/auth";
import { getMaskedPhone } from "@utils/get-masked-phone.util";
import type { AxiosError } from "axios";
import { toDate } from "date-fns";
import type { FactoryArg, InputMask } from "imask";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { IUniqueFieldsState } from "../types/info-section.type";

export const useInfoSection = (
	gender: EnumGenders | undefined,
	birthdate: string | undefined,
	username: string | undefined,
	phone: string | undefined,
	refetch: (opts?: RefetchOptions) => void
) => {
	const defaultValues: TUpdateUserinfoFields = {
		birthdate: birthdate ? toDate(birthdate) : undefined,
		username,
		gender,
		phone: phone ? getMaskedPhone(phone, PHONE_MASK_PATTERN) : undefined,
	};

	const t = useTranslations("global.settings.content.profile.personal-info");

	const [mask, setMask] = useState<InputMask<FactoryArg> | undefined>(undefined);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);
	const [uniqueFields, setUniqueFields] = useState<IUniqueFieldsState>({
		username: null,
		phone: null,
	});

	const { isProfileUpdating, updateProfileAsync } = useUpdateProfileS();
	const { checkFieldUniqueAsync, isCheckingUnique } = useUniqueFieldCheckS();

	const schema = createUpdateUserinfoSchema(t);
	const form = useForm<TUpdateUserinfoFields>({
		resolver: zodResolver(schema),
		mode: "onChange",
		values: defaultValues,
		defaultValues,
	});

	const checkUnique = (field: "username" | "phone", value: string) => {
		const isDisabled = value.length === 0 || form.formState.defaultValues?.[field] === (field === "phone" ? mask?.value : value);

		if (!isDisabled && (field === "username" ? validateUsername(value) : checkPhoneNumber(value))) {
			setUniqueFields(prev => ({ ...prev, [field]: "loading" }));

			checkFieldUniqueAsync({ field: field, fieldValue: value })
				.then(() => setUniqueFields(prev => ({ ...prev, [field]: true })))
				.catch(e => {
					const { errMsg } = errorCatch(e as AxiosError);
					form.setError(field, { message: errMsg });

					setUniqueFields(prev => ({ ...prev, [field]: false }));
				});
		} else setUniqueFields(prev => ({ ...prev, [field]: null }));
	};

	const onSubmit = async (data: TUpdateUserinfoFields) => {
		try {
			const dto: IUpdateProfileDto = {
				birthdate: data.birthdate || null,
				gender: data.gender === gender ? undefined : data.gender,
				username: data.username === username ? undefined : data.username,
				phoneNumber: getMaskedPhone(phone, PHONE_MASK_PATTERN) === data.phone ? undefined : mask!.unmaskedValue || null,
			};

			await updateProfileAsync(dto);

			refetch();
			toast.success(t("toasters.success"));
		} catch (e) {
			console.log(e);
			const { errMsg } = errorCatch(e as AxiosError);
			const msg = t("toasters.error", { e: errMsg });

			toast.error(msg);
		}
	};

	const clearBirthdate = () => {
		if (form.getValues("birthdate")) {
			form.setValue("birthdate", undefined);
		}
	};

	const data: IDropdownData[] = [
		{ id: useId(), label: t("gender.data.male"), value: EnumGenders.MALE },
		{ id: useId(), label: t("gender.data.female"), value: EnumGenders.FEMALE },
		{ id: useId(), label: t("gender.data.other"), value: EnumGenders.OTHER },
	];

	useEffect(() => {
		if (!form.formState.isValid) return setIsDisabled(true);

		for (const key in uniqueFields) {
			if (uniqueFields[key as keyof typeof uniqueFields] === false) return setIsDisabled(true);
		}

		const json_default = JSON.stringify(form.formState.defaultValues);
		const json_values = JSON.stringify(form.getValues());

		if (json_default === json_values) return setIsDisabled(true);
		else {
			if (!form.getValues("username")) return setIsDisabled(true);
			else return setIsDisabled(false);
		}
	}, [form.getValues(), uniqueFields]);

	useDebounce(
		() => {
			checkUnique("username", form.getValues("username") || "");
		},
		200,
		[form.getValues("username")]
	);

	useDebounce(
		() => {
			checkUnique("phone", mask?.unmaskedValue || "");
		},
		200,
		[form.getValues("phone")]
	);

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
		t,
	};
};
