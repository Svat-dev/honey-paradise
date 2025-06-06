"use client";

import { DateInput } from "./components/input-types/DateInput";
import { DefaultInput } from "./components/input-types/DefaultInput";
import { ErrorText } from "./components";
import type { FC } from "react";
import type { IFormInputProps } from "./types/form-input.type";
import { RadioGroupInput } from "./components/input-types/RadioGroupInput";
import { cn } from "@/shared/lib/utils/base";
import styles from "./styles/form-input.module.scss";
import { useFormInput } from "./hooks/useFormInput";

const FormInput: FC<IFormInputProps> = ({ name, containerClassName, errorClassName, setMask, clearBtnClassName, ...props }) => {
	const { error, input_type } = useFormInput(name);

	return (
		<div className={cn(styles["wrapper"], containerClassName)}>
			{input_type === "default" && <DefaultInput name={name} setMask={setMask} clearBtnClassName={clearBtnClassName} {...props} />}

			{input_type === "radio-group" && <RadioGroupInput name={name} />}

			{input_type === "date" && <DateInput name="birthdate" />}

			{error && <ErrorText error={error as string} className={cn(styles["error-txt"], errorClassName)} />}
		</div>
	);
};
export { FormInput };
