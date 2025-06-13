"use client";

import { OTPInput, OTPInputContext } from "input-otp";
import { ComponentPropsWithoutRef, ComponentRef, forwardRef, useContext } from "react";

import { cn } from "@utils/base";
import { MinusIcon } from "lucide-react";

const InputOTP = forwardRef<ComponentRef<typeof OTPInput>, ComponentPropsWithoutRef<typeof OTPInput>>(
	({ className, containerClassName, ...props }, ref) => (
		<OTPInput
			ref={ref}
			containerClassName={cn("tw-flex tw-items-center tw-gap-2 has-[:disabled]:tw-opacity-50", containerClassName)}
			className={cn("disabled:tw-cursor-not-allowed", className)}
			{...props}
		/>
	)
);
InputOTP.displayName = "InputOTP";

const InputOTPGroup = forwardRef<ComponentRef<"div">, ComponentPropsWithoutRef<"div">>(({ className, ...props }, ref) => (
	<div ref={ref} className={cn("tw-flex tw-items-center", className)} {...props} />
));
InputOTPGroup.displayName = "InputOTPGroup";

const InputOTPSlot = forwardRef<ComponentRef<"div">, ComponentPropsWithoutRef<"div"> & { index: number; caretClassName?: string }>(
	({ index, className, caretClassName, ...props }, ref) => {
		const inputOTPContext = useContext(OTPInputContext);
		const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index];

		return (
			<div
				ref={ref}
				className={cn(
					"tw-relative tw-bg-secondary tw-flex tw-h-9 tw-w-9 tw-items-center tw-justify-center tw-border-y tw-border-r tw-border-muted tw-text-sm tw-shadow-sm tw-transition-all first:tw-rounded-l-md first:tw-border-l last:tw-rounded-r-md",
					isActive && "tw-z-10 tw-ring-1 tw-ring-muted-darker",
					className
				)}
				{...props}
			>
				{char}
				{hasFakeCaret && (
					<div className="tw-pointer-events-none tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
						<div className={cn("tw-h-5 tw-w-px tw-bg-muted tw-animate-caret-blink", caretClassName)} />
					</div>
				)}
			</div>
		);
	}
);
InputOTPSlot.displayName = "InputOTPSlot";

const InputOTPSeparator = forwardRef<ComponentRef<"div">, ComponentPropsWithoutRef<"div">>(({ ...props }, ref) => (
	<div ref={ref} role="separator" {...props}>
		<MinusIcon />
	</div>
));
InputOTPSeparator.displayName = "InputOTPSeparator";

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot };
