import { cn } from "@utils/base"
import { forwardRef, type InputHTMLAttributes } from "react"

import styles from "./styles/input.module.scss"

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IInputProps>(
	({ className, type, ...props }, ref) => {
		return (
			<input
				type={type}
				className={cn(styles["input-ui"], className)}
				ref={ref}
				{...props}
			/>
		)
	}
)
Input.displayName = "Input"

export { Input }
