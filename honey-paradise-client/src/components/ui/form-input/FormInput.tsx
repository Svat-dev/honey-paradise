"use client";

import { cn } from "@/shared/lib/utils/base";
import type { FC } from "react";
import { ErrorText } from "./components";
import { DateInput } from "./components/input-types/DateInput";
import { DefaultInput } from "./components/input-types/DefaultInput";
import { RadioGroupInput } from "./components/input-types/RadioGroupInput";
import { useFormInput } from "./hooks/useFormInput";
import styles from "./styles/form-input.module.scss";
import type { IFormInputProps } from "./types/form-input.type";

const FormInput: FC<IFormInputProps> = ({ name, containerClassName, errorClassName, setMask, clearBtnClassName, data, ...props }) => {
	const { error, input_type } = useFormInput(name);

	return (
		<div className={cn(styles["wrapper"], containerClassName)}>
			{input_type === "default" && <DefaultInput name={name} setMask={setMask} clearBtnClassName={clearBtnClassName} {...props} />}

			{input_type === "radio-group" && <RadioGroupInput name={name} data={data} />}

			{input_type === "date" && <DateInput name="birthdate" />}

			{error && <ErrorText error={error as string} className={cn(styles["error-txt"], errorClassName)} />}
		</div>
	);
};
export { FormInput };
