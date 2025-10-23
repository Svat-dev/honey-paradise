import { Input, Skeleton } from "@/components/ui/common";
import type { FC, PropsWithChildren } from "react";

import { cn } from "@utils/base";
import { useFormDefaultInput } from "../../hooks/useFormDefaultInput";
import styles from "../../styles/default-input.module.scss";
import type { IFormDefaultInputProps } from "../../types/form-input.type";
import { ClearButton } from "../clear-button";
import { PasswordEye } from "../password-eye";

const DefaultInput: FC<PropsWithChildren<IFormDefaultInputProps>> = ({
	name,
	setMask,
	clearBtnClassName,
	className,
	isLoading,
	label,
	children,
	...props
}) => {
	const { clear, clearError, isPassword, isShowPassword, onInput, showPassword, register, t, value } = useFormDefaultInput(name, setMask);

	return (
		<div className={styles["input-wrapper"]}>
			<Input
				className={cn(className, { "tracking-widest": isPassword })}
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

			{label && <span className={styles["label"]}>{label}</span>}

			{children}

			{isPassword && <PasswordEye value={isShowPassword} onClick={showPassword} className="!-translate-y-[45%]" t={t} />}
			<ClearButton onClick={clear} value={value} className={cn(clearBtnClassName, "!-translate-y-[45%]")} t={t} />
		</div>
	);
};

export { DefaultInput };
