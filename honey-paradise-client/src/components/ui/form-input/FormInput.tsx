"use client";

import { ClearButton, ErrorText, PasswordEye } from "./components";

import { cn } from "@/shared/lib/utils/base";
import type { FC } from "react";
import styles from "./form-input.module.scss";
import type { IFormInputProps } from "./form-input.type";
import { useFormInput } from "./useFormInput";

const FormInput: FC<IFormInputProps> = ({
	name,
	className,
	containerClassName,
	errorClassName,
	label,
	setMask,
	clearBtnClassName,
	...props
}) => {
	const { clear, error, isPassword, isShowPassword, onInput, register, value, setIsShowPassword, clearError, t } = useFormInput(
		name,
		setMask
	);

	return (
		<div className={cn(styles["wrapper"], containerClassName)}>
			<div className={styles["input-wrapper"]}>
				<input
					className={cn(className, styles["input"], { "tw-tracking-widest": isPassword })}
					onInput={onInput}
					{...props}
					type={!isPassword ? props.type : isShowPassword ? "text" : props.type}
					{...register(name, { required: "Поле обязательно для заполнения", onChange: clearError })}
				/>

				{label && (
					<p className={styles["label"]}>
						{label}
						{props.required && <span className="tw-text-red-500">*</span>}
					</p>
				)}

				<i className={styles["decor-input"]}></i>

				{isPassword && <PasswordEye value={isShowPassword} onClick={() => setIsShowPassword(prev => !prev)} t={t} />}
				<ClearButton onClick={clear} value={value} className={clearBtnClassName} t={t} />
			</div>

			{error && <ErrorText error={error as string} className={cn(styles["error-txt"], errorClassName)} />}
		</div>
	);
};
export { FormInput };
