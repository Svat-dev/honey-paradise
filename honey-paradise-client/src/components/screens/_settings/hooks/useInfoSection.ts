import type { IDropdownData } from "@/components/ui/form-input/types/form-input.type";
import { EnumGenders } from "@/shared/types/models";
import { zodResolver } from "@hookform/resolvers/zod";
import { type TUpdateUserinfoFields, createUpdateUserinfoSchema } from "@schemas/update-userinfo.schema";
import { toDate } from "date-fns";
import type { FactoryArg, InputMask } from "imask";
import { useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";

export const useInfoSection = (
	gender: EnumGenders | undefined,
	birthdate: string | undefined,
	username: string | undefined,
	phone: string | undefined
) => {
	const defaultValues: TUpdateUserinfoFields = {
		birthdate: birthdate ? toDate(birthdate) : undefined,
		username,
		gender,
		phone: phone || "",
	};

	const [mask, setMask] = useState<InputMask<FactoryArg> | undefined>(undefined);
	const [isDisabled, setIsDisabled] = useState<boolean>(false);

	const updateUserinfoSchema = createUpdateUserinfoSchema({});
	const form = useForm<TUpdateUserinfoFields>({
		resolver: zodResolver(updateUserinfoSchema),
		mode: "onChange",
		values: defaultValues,
		defaultValues,
	});

	const onSubmit = (_data: TUpdateUserinfoFields) => {
		const data = { ..._data, phone: mask?.unmaskedValue };
		console.log(data);
	};

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

	const data: IDropdownData[] = [
		{ id: useId(), label: "Мужской", value: EnumGenders.MALE },
		{ id: useId(), label: "Женский", value: EnumGenders.FEMALE },
		{ id: useId(), label: "Не указывать", value: EnumGenders.OTHER },
	];

	return {
		form,
		setMask,
		isDisabled,
		data,
		onSubmit: form.handleSubmit(onSubmit),
	};
};
