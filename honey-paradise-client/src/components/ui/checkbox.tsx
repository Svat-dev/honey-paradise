"use client";

import { useId, type FC, type InputHTMLAttributes, type PropsWithChildren } from "react";

import { cn } from "@utils/base";
import { CheckIcon } from "lucide-react";
import styles from "./styles/checkbox.module.scss";

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
	labelClassName?: string;
	containerClassName?: string;
}

const Checkbox: FC<PropsWithChildren<ICheckbox>> = ({ children, className, containerClassName, labelClassName, ...props }) => {
	const id = useId();

	return (
		<div className={cn(styles["checkbox-main-wrapper"], containerClassName)}>
			<input className={styles["checkbox-input"]} type="checkbox" spellCheck={false} id={id} {...props} />

			<label htmlFor={id} className={styles["checkbox-wrapper"]}>
				<div className={cn(styles["checkbox-decor-input"], className)}>
					<CheckIcon size={18} strokeWidth={3} />
				</div>

				<p className={cn(styles["checkbox-label"], labelClassName)}>{children}</p>
			</label>
		</div>
	);
};

export { Checkbox };
