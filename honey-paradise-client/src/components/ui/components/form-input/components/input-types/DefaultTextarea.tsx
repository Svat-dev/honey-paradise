import { type FC, type PropsWithChildren } from "react";

import { cn } from "@utils/base";
import { useFormDefaultTextarea } from "../../hooks/useFormDefaultTextarea";
import _styles from "../../styles/default-input.module.scss";
import styles from "../../styles/default-textarea.module.scss";
import type { IFormDefaultTextareaProps } from "../../types/form-input.type";
import { ClearButton } from "../clear-button";
import { TextareaCounter } from "../textarea-counter";

const DefaultTextarea: FC<PropsWithChildren<IFormDefaultTextareaProps>> = ({
	name,
	clearBtnClassName,
	className,
	isLoading,
	label,
	children,
	counter,
	rows,
	cols,
	...props
}) => {
	const { clear, clearError, onInput, register, t, value } = useFormDefaultTextarea(name);

	return (
		<div className={_styles["input-wrapper"]}>
			<textarea
				className={cn(className, styles["textarea"])}
				onInput={onInput}
				rows={rows ? rows : 2}
				cols={cols ? cols : 30}
				{...props}
				placeholder={!isLoading ? (props.placeholder ? props.placeholder : "") : undefined}
				spellCheck={true}
				disabled={props?.disabled || isLoading}
				{...register(name, { onChange: clearError })}
			/>

			{props.required && <span className={_styles["required"]}>*</span>}

			{label && <span className={_styles["label"]}>{label}</span>}

			{children}

			{counter && <TextareaCounter length={String(value).length} maxLength={props.maxLength} />}

			<ClearButton onClick={clear} value={value} className={cn(clearBtnClassName, "!top-2.5")} t={t} />
		</div>
	);
};

export { DefaultTextarea };
