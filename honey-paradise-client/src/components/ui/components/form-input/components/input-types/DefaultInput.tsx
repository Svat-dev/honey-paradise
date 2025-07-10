import { Input, Skeleton } from "@/components/ui/common";

import { cn } from "@utils/base";
import type { FC } from "react";
import { useFormDefaultInput } from "../../hooks/useFormDefaultInput";
import styles from "../../styles/default-input.module.scss";
import type { IFormDefaultInputProps } from "../../types/form-input.type";
import { ClearButton } from "../clear-button";
import { PasswordEye } from "../password-eye";

const DefaultInput: FC<IFormDefaultInputProps> = ({ name, setMask, clearBtnClassName, label, className, isLoading, ...props }) => {
	const { clear, clearError, isPassword, isShowPassword, onInput, showPassword, register, t, value } = useFormDefaultInput(name, setMask);

	return (
		<div className={styles["input-wrapper"]}>
			<Input
				className={cn(className, { "tw-tracking-widest": isPassword })}
				onInput={onInput}
				{...props}
				placeholder={!isLoading ? (props.placeholder ? props.placeholder : name) : undefined}
				type={!isPassword ? props.type : isShowPassword ? "text" : props.type}
				spellCheck={false}
				disabled={props?.disabled || isLoading}
				{...register(name, { onChange: clearError })}
			/>

			{isLoading && (
				<div className={styles["loader"]}>
					<Skeleton />
					<Skeleton />
					<Skeleton />
				</div>
			)}

			{props.required && <span className={styles["required"]}>*</span>}

			{isPassword && <PasswordEye value={isShowPassword} onClick={showPassword} className="!-tw-translate-y-[45%]" t={t} />}
			<ClearButton onClick={clear} value={value} className={cn(clearBtnClassName, "!-tw-translate-y-[45%]")} t={t} />
		</div>
	);
};

export { DefaultInput };
