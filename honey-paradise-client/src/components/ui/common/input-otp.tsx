"use client"

import { cn } from "@utils/base"
import { OTPInput, OTPInputContext } from "input-otp"
import { MinusIcon } from "lucide-react"
import {
	ComponentPropsWithoutRef,
	ComponentRef,
	forwardRef,
	useContext
} from "react"

import styles from "./styles/input-otp.module.scss"

const InputOTP = forwardRef<
	ComponentRef<typeof OTPInput>,
	ComponentPropsWithoutRef<typeof OTPInput>
>(({ className, containerClassName, ...props }, ref) => (
	<OTPInput
		ref={ref}
		className={cn(styles["input-otp-ui"], className)}
		containerClassName={cn(
			styles["input-otp-ui-container"],
			containerClassName
		)}
		{...props}
	/>
))
InputOTP.displayName = "InputOTP"

const InputOTPGroup = forwardRef<
	ComponentRef<"div">,
	ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
	<div
		ref={ref}
		className={cn(styles["input-otp-group-ui"], className)}
		{...props}
	/>
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = forwardRef<
	ComponentRef<"div">,
	ComponentPropsWithoutRef<"div"> & { index: number; caretClassName?: string }
>(({ index, className, caretClassName, ...props }, ref) => {
	const inputOTPContext = useContext(OTPInputContext)
	const { char, hasFakeCaret, isActive } = inputOTPContext.slots[index]

	return (
		<div
			ref={ref}
			className={cn(
				styles["input-otp-slot-ui"],
				isActive && styles["input-otp-slot-ui-active"],
				className
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className={styles["input-otp-slot-caret-container-ui"]}>
					<div
						className={cn(styles["input-otp-slot-caret-ui"], caretClassName)}
					/>
				</div>
			)}
		</div>
	)
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = forwardRef<
	ComponentRef<"div">,
	ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => (
	<div ref={ref} role="separator" {...props}>
		<MinusIcon />
	</div>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }
