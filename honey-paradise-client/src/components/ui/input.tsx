import { cn } from "@utils/base";
import { forwardRef, type InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, IInputProps>(({ className, type, ...props }, ref) => {
	return (
		<input
			type={type}
			className={cn(
				"tw-flex tw-w-full tw-rounded-md tw-outline-none tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-file:border-0 tw-file:bg-transparent tw-file:text-sm tw-file:font-medium tw-placeholder:text-muted tw-focus-visible:outline-none tw-disabled:cursor-not-allowed tw-disabled:opacity-50",
				className
			)}
			ref={ref}
			{...props}
		/>
	);
});
Input.displayName = "Input";

export { Input };
