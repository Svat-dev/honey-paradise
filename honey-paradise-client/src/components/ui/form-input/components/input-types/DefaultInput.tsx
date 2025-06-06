import { ClearButton } from "../clear-button";
import type { FC } from "react";
import type { IFormDefaultInputProps } from "../../types/form-input.type";
import { PasswordEye } from "../password-eye";
import { cn } from "@utils/base";
import styles from "../../styles/form-input.module.scss";
import { useFormDefaultInput } from "../../hooks/useFormDefaultInput";

const DefaultInput: FC<IFormDefaultInputProps> = ({ name, setMask, clearBtnClassName, label, className, ...props }) => {
	const { clear, clearError, isPassword, isShowPassword, onInput, placeholder, setIsShowPassword, register, t, value } =
		useFormDefaultInput(name, setMask);

	return (
		<div className={styles["input-wrapper"]}>
			<input
				className={cn(className, styles["input"], { "tw-tracking-widest": isPassword })}
				onInput={onInput}
				{...props}
				placeholder={placeholder}
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
	);
};

export { DefaultInput };
