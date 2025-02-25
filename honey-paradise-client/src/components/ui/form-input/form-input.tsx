import { onInputRule, onInputRuleWithSpaces } from "@utils/input-rule";
import IMask, { type InputMask } from "imask";
import { type ChangeEvent, type FC, type InputHTMLAttributes, useEffect, useState } from "react";
import { ClearButton, ErrorText, PasswordEye } from "./components";

import { cn } from "@/shared/lib/utils/base";
import { type ReactStateHook } from "@/shared/types/base.type";
import { useFormContext } from "react-hook-form";
import { Input } from "../input";

export interface IFromInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: any;
	label?: string;
	required?: boolean;
	containerClassName?: string;
	clearBtnClassName?: string;
	errorClassName?: string;
	setMask?: ReactStateHook<InputMask<{ mask: string; lazy: true }> | undefined>;
}

const FormInput: FC<IFromInputProps> = ({
	name,
	className,
	containerClassName,
	errorClassName,
	label,
	required,
	setMask,
	clearBtnClassName,
	...props
}) => {
	const { register, formState, watch, setValue, control } = useFormContext();

	const isNeedPassEye = name === "password" || name === "confirmPassword";
	const value = watch(name);
	const error = formState.errors[name]?.message || "";
	const input = control._fields[name]?._f?.ref as HTMLInputElement;
	const isPhone = name === "phoneNumber";

	let mask: InputMask<{ mask: string; lazy: true }>;

	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

	useEffect(() => {
		if (input.type && isPhone) {
			mask = IMask(input, {
				mask: "+{7} (000) 000-00-00",
				lazy: true,
			});

			setMask?.(mask);
		}
	}, [input]);

	const clear = () => setValue(name, "", { shouldValidate: true });

	const onInput = (e: ChangeEvent<HTMLInputElement>) => {
		if (name === "fullName") onInputRuleWithSpaces(e.target);
		else if (!isPhone) onInputRule(e.target);
	};

	return (
		<div className={cn("relative", containerClassName)}>
			{label && (
				<p className="font-medium mb-2 absolute right-1 -top-4 select-none pointer-events-none">
					{label} {required && <span className="text-red-500">*</span>}
				</p>
			)}

			<div className="relative">
				<Input
					className={cn("h-12 text-md", { "pl-11": isNeedPassEye }, className)}
					onInput={onInput}
					{...props}
					type={!isNeedPassEye ? props.type : isShowPassword ? "text" : props.type}
					{...register(name, { required })}
				/>

				{isNeedPassEye && <PasswordEye value={isShowPassword} onClick={() => setIsShowPassword(prev => !prev)} />}
				<ClearButton onClick={clear} value={value} className={clearBtnClassName} />
			</div>

			{error && <ErrorText error={error as string} className={cn("mt-2 absolute ml-3 top-14", errorClassName)} />}
		</div>
	);
};

export { FormInput };
