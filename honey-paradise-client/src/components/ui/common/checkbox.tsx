"use client";

import { forwardRef, useId, type InputHTMLAttributes, type PropsWithChildren } from "react";

import { cn } from "@utils/base";
import { CheckIcon } from "lucide-react";
import styles from "./styles/checkbox.module.scss";

interface ICheckbox extends InputHTMLAttributes<HTMLInputElement> {
	labelClassName?: string;
	containerClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, PropsWithChildren<ICheckbox>>(
	({ children, className, containerClassName, labelClassName, ...props }, ref) => {
		const id = useId();

		return (
			<div className={cn(styles["checkbox-main-wrapper"], containerClassName)}>
				<input className={styles["checkbox-input"]} type="checkbox" spellCheck={false} id={id} ref={ref} {...props} />

				<label htmlFor={id} className={styles["checkbox-wrapper"]}>
					<div className={cn(styles["checkbox-decor-input"], className)} data-disabled={props.disabled}>
						<CheckIcon size={18} strokeWidth={3} />
					</div>

					<p className={cn(styles["checkbox-label"], labelClassName)}>{children}</p>
				</label>
			</div>
		);
	}
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
