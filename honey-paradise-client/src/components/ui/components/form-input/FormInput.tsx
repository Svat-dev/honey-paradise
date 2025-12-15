"use client";

import type { FC, PropsWithChildren } from "react";

import { cn } from "@utils/base";
import { AnimatePresence } from "motion/react";
import { ErrorText } from "./components";
import { DateInput } from "./components/input-types/DateInput";
import { DefaultDecorInput } from "./components/input-types/DefaultDecorInput";
import { DefaultInput } from "./components/input-types/DefaultInput";
import { DefaultTextarea } from "./components/input-types/DefaultTextarea";
import { DropdownInput } from "./components/input-types/DropdownInput";
import { OTPInput } from "./components/input-types/OTPInput";
import { RadioGroupInput } from "./components/input-types/RadioGroupInput";
import { useFormInput } from "./hooks/useFormInput";
import styles from "./styles/default-input.module.scss";
import type { IFormInputProps } from "./types/form-input.type";

const FormInput: FC<PropsWithChildren<IFormInputProps>> = ({
	name,
	containerClassName,
	errorClassName,
	setMask,
	clearBtnClassName,
	data,
	caretClassName,
	otpSlotsLimit,
	isDecorated,
	genderType,
	dateConfig,
	align,
	isLoading,
	textareaProps,
	children,
	...props
}) => {
	const { error, input_type } = useFormInput(name, isDecorated, genderType);

	return (
		<div className={cn(styles["wrapper"], containerClassName)}>
			{input_type === "default-decor" && (
				<DefaultDecorInput name={name} setMask={setMask} clearBtnClassName={clearBtnClassName} isLoading={isLoading} {...props} />
			)}

			{input_type === "default" && (
				<DefaultInput name={name} setMask={setMask} clearBtnClassName={clearBtnClassName} isLoading={isLoading} {...props} />
			)}

			{input_type === "textarea" && (
				<DefaultTextarea clearBtnClassName={clearBtnClassName} isLoading={isLoading} {...textareaProps} name={name} label={props.label} />
			)}

			{input_type === "radio-group" && <RadioGroupInput name={name} data={data} isLoading={isLoading} />}

			{input_type === "date" && <DateInput name="birthdate" config={dateConfig} isLoading={isLoading} />}

			{input_type === "otp" && (
				<OTPInput limit={otpSlotsLimit as number} containerClassName={containerClassName} caretClassName={caretClassName} {...props} />
			)}

			{input_type === "dropdown" && <DropdownInput name={name} data={data} align={align} isLoading={isLoading} {...props} />}

			{children && children}

			<AnimatePresence>
				{error && <ErrorText error={error as string} className={cn(styles["error-txt"], errorClassName)} />}
			</AnimatePresence>
		</div>
	);
};
export { FormInput };
