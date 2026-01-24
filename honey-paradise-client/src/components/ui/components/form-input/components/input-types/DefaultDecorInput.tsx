import { cn } from "@utils/base"
import type { FC } from "react"

import { useFormDefaultInput } from "../../hooks/useFormDefaultInput"
import styles from "../../styles/default-decor-input.module.scss"
import def_styles from "../../styles/default-input.module.scss"
import type { IFormDefaultInputProps } from "../../types/form-input.type"
import { ClearButton } from "../clear-button"
import { PasswordEye } from "../password-eye"

const DefaultDecorInput: FC<IFormDefaultInputProps> = ({
	name,
	setMask,
	clearBtnClassName,
	label,
	className,
	isLoading,
	...props
}) => {
	const {
		clear,
		clearError,
		isPassword,
		isShowPassword,
		onInput,
		showPassword,
		register,
		t,
		value
	} = useFormDefaultInput(name, setMask)

	return (
		<div className={def_styles["input-wrapper"]}>
			<input
				className={cn(className, styles["input"], {
					"tracking-widest": isPassword
				})}
				onInput={onInput}
				{...props}
				placeholder={props.placeholder ? props.placeholder : name}
				type={!isPassword ? props.type : isShowPassword ? "text" : props.type}
				spellCheck={false}
				{...register(name, {
					required: "Поле обязательно для заполнения",
					onChange: clearError
				})}
			/>

			{label && (
				<p className={styles["label"]}>
					{label}
					{props.required && <span className="text-red-500">*</span>}
				</p>
			)}

			<i className={styles["decor-input"]}></i>

			{isPassword && (
				<PasswordEye value={isShowPassword} onClick={showPassword} t={t} />
			)}
			<ClearButton
				onClick={clear}
				value={value}
				className={clearBtnClassName}
				t={t}
			/>
		</div>
	)
}

export { DefaultDecorInput }
