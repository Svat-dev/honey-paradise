import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui";
import type { FC, InputHTMLAttributes } from "react";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useFormInput } from "../../hooks/useFormInput";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
	limit: number;
	containerClassName?: string;
	caretClassName?: string;
}

const OTPInput: FC<IProps> = ({ containerClassName, caretClassName, className, limit }) => {
	const { setValue, value } = useFormInput("pin");

	const onChange = (value: string) => setValue("pin", value);
	const slotsLimit = limit;

	return (
		<div className={containerClassName}>
			<InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} value={value} onChange={onChange} spellCheck={false} autoFocus>
				{...Array(slotsLimit)
					.fill(0)
					.map((_, i) => (
						<InputOTPGroup key={i + 1}>
							<InputOTPSlot index={i} className={className} caretClassName={caretClassName} />
						</InputOTPGroup>
					))}
			</InputOTP>
		</div>
	);
};

export { OTPInput };
