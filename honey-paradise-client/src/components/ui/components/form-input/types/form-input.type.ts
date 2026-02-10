import type { TConfirmationFields } from "@schemas/confirmation.schema"
import type { TSignInFields } from "@schemas/sign-in.schema"
import type { TSignUpFields } from "@schemas/sign-up.schema"
import type { TUpdateAppearanceFields } from "@schemas/update-appearance.schema"
import type { TUpdateUserinfoFields } from "@schemas/update-userinfo.schema"
import type { FactoryArg } from "imask"
import type InputMask from "imask/esm/controls/input"
import type { LucideIcon } from "lucide-react"
import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react"
import type { Options } from "vanilla-calendar-pro"

import type { TCreateReviewSchema } from "@/shared/lib/schemas/create-review.schema"
import type { TPromoCodeFields } from "@/shared/lib/schemas/promo-code.schema"
import type { ReactStateHook } from "@/shared/types/base.type"

type TSetMask = ReactStateHook<InputMask<FactoryArg> | undefined>

export type TFieldNames =
	| keyof TSignInFields
	| keyof TSignUpFields
	| keyof TConfirmationFields
	| keyof TUpdateUserinfoFields
	| keyof TUpdateAppearanceFields
	| keyof TCreateReviewSchema
	| keyof TPromoCodeFields

export type TInputType =
	| "default"
	| "default-decor"
	| "textarea"
	| "radio-group"
	| "date"
	| "otp"
	| "dropdown"

export interface IFormInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: TFieldNames
	label?: string
	isLoading?: boolean
	containerClassName?: string
	clearBtnClassName?: string
	errorClassName?: string
	caretClassName?: string
	setMask?: TSetMask
	data?: IRadioGroupData[] | IDropdownData[]
	otpSlotsLimit?: number
	isDecorated?: boolean
	genderType?: "radio-group" | "dropdown"
	align?: "center" | "start" | "end"
	dateConfig?: Options
	textareaProps?: TextareaHTMLAttributes<HTMLTextAreaElement> & {
		counter?: boolean
	}
}

export interface IRadioGroupData {
	id: string
	value: string
	label: string
}

export interface IDropdownData extends IRadioGroupData {
	icon?: LucideIcon
}

export interface IFormDefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: TFieldNames
	label?: string
	clearBtnClassName?: string
	setMask?: TSetMask
	isLoading?: boolean
}

export interface IFormDefaultTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	name: TFieldNames
	counter?: boolean
	label?: string
	clearBtnClassName?: string
	isLoading?: boolean
}

export interface IRadioGroupInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: TFieldNames
	data: IRadioGroupData[] | undefined
	isLoading?: boolean
}

export interface IDropdownInputProps extends InputHTMLAttributes<HTMLInputElement> {
	name: TFieldNames
	data: IDropdownData[] | undefined
	align?: "center" | "start" | "end"
	isLoading?: boolean
}
