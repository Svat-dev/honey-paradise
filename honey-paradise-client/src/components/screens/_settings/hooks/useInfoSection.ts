import { errorCatch } from "@/api/api-helper";
import type { IDropdownData } from "@/components/ui/form-input/types/form-input.type";
import { useUpdateProfileS } from "@/services/hooks/profile";
import type { IUpdateProfileDto } from "@/services/types/profile-service.type";
import { EnumGenders } from "@/shared/types/models";
import { PHONE_MASK_PATTERN } from "@constants/base";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TUpdateUserinfoFields, createUpdateUserinfoSchema } from "@schemas/update-userinfo.schema";
import type { RefetchOptions } from "@tanstack/react-query";
import { getMaskedPhone } from "@utils/get-masked-phone.util";
import type { AxiosError } from "axios";
import { toDate } from "date-fns";
import type { FactoryArg, InputMask } from "imask";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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

	const { isProfileUpdating, updateProfileAsync } = useUpdateProfileS();

	const updateUserinfoSchema = createUpdateUserinfoSchema(t);
	const form = useForm<TUpdateUserinfoFields>({
		resolver: zodResolver(updateUserinfoSchema),
		mode: "onChange",
		values: defaultValues,
		defaultValues,
	});

	const onSubmit = async (data: TUpdateUserinfoFields) => {
		try {
			const dto: IUpdateProfileDto = {
				birthdate: data.birthdate || null,
				gender: data.gender === gender ? undefined : data.gender,
				username: data.username === username ? undefined : data.username,
				phoneNumber: mask!.unmaskedValue === phone ? undefined : mask!.unmaskedValue || null,
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

		const json_default = JSON.stringify(defaultValues);
		const json_values = JSON.stringify(form.getValues());

		if (json_default === json_values) return setIsDisabled(true);
		else {
			if (!form.getValues("username")) return setIsDisabled(true);
			else return setIsDisabled(false);
		}
	}, [form.getValues()]);

	return {
		form,
		setMask,
		isDisabled,
		data,
		onSubmit: form.handleSubmit(onSubmit),
		isProfileUpdating,
		clearBirthdate,
		t,
	};
};
