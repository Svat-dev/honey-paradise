import { zodResolver } from "@hookform/resolvers/zod"
import { createSignUpSchema, type TSignUpFields } from "@schemas/sign-up.schema"
import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import {
	redirect,
	RedirectType,
	useRouter
} from "next/dist/client/components/navigation"
import { useEffect, useRef, useState } from "react"
import type ReCAPTCHA from "react-google-recaptcha"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useCreateAccountS } from "@/services/hooks/auth"
import { EnumAppRoute } from "@/shared/lib/constants/routes"
import type { TSearchParams } from "@/shared/types/base.type"
import { type CreateUserDto, GetMeResponseGender } from "@/shared/types/server"

import type {
	IIsActive,
	TCurrentPart,
	TDataStatus
} from "../types/sign-up.type"

export const useSignUp = (searchParams: TSearchParams) => {
	if (!searchParams?.active_tab)
		return redirect(EnumAppRoute.NOT_FOUND, RedirectType.replace)

	if (
		!searchParams?.active_tab.includes("main") &&
		!searchParams?.active_tab.includes("optional")
	)
		return redirect(EnumAppRoute.NOT_FOUND, RedirectType.replace)

	const t = useTranslations("global.sign-up.content")
	const errorDelay = 5000

	const { createAcc, isCreateAccLoading } = useCreateAccountS()
	const { push, replace, prefetch } = useRouter()

	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const [isError, setIsError] = useState<boolean>(false)

	const [currentPart, setCurrentPart] = useState<TCurrentPart>(
		searchParams.active_tab as TCurrentPart
	)
	const [dataStatus, setDataStatus] = useState<TDataStatus>("default")
	const [isActive, setIsActive] = useState<IIsActive>({
		main: currentPart === "main",
		optional: currentPart === "optional"
	})

	const recaptchaRef = useRef<ReCAPTCHA>(null)

	const schema = createSignUpSchema(t)
	const form = useForm<TSignUpFields>({
		resolver: zodResolver(schema),
		mode: "onChange",
		defaultValues: {
			confirmPassword: "",
			password: "",
			email: "",
			birthdate: undefined,
			gender: GetMeResponseGender.OTHER,
			username: undefined
		}
	})

	const isDisabled = () => {
		const isPassValid =
			!form.getFieldState("password").invalid &&
			form.getValues("password").length !== 0
		const isEmailValid =
			!form.getFieldState("email").invalid &&
			form.getValues("email").length !== 0
		const isConfPassValid =
			!form.getFieldState("confirmPassword").invalid &&
			form.getValues("confirmPassword").length !== 0

		return (
			!isPassValid ||
			!isEmailValid ||
			!isConfPassValid ||
			dataStatus !== "default"
		)
	}

	const onClickToNext = () => {
		setIsActive(prev => ({ ...prev, main: false, optional: true }))
		setTimeout(() => {
			setCurrentPart("optional")
			push(`?active_tab=optional`)
		}, 400)
	}

	const onClickToPrevious = () => {
		setIsActive(prev => ({ ...prev, optional: false, main: true }))
		setTimeout(() => {
			setCurrentPart("main")
			push(`?active_tab=main`)
		}, 400)
	}

	const onRecaptchaChange = (token: string | null) => {
		setRecaptchaValue(token)
		setIsError(false)
	}

	const onError = (msg: string) => {
		setDataStatus("error")
		toast.error(msg, { duration: errorDelay, style: { maxWidth: "25rem" } })

		return setTimeout(() => {
			setDataStatus("default")

			setRecaptchaValue(null)
			recaptchaRef.current?.reset()
		}, errorDelay)
	}

	const onSubmitFunc = async (formData: TSignUpFields) => {
		if (!recaptchaValue) {
			setIsError(true)
			setDataStatus("error")
			return setTimeout(() => setDataStatus("default"), errorDelay)
		}

		try {
			const { confirmPassword, ..._data } = formData
			const data: CreateUserDto = {
				..._data,
				birthdate: _data.birthdate?.toISOString()
			}

			await createAcc({ recaptcha: recaptchaValue, dto: data })

			setDataStatus("good")
			prefetch(EnumAppRoute.EMAIL_CONFIRMATION)
			toast.success(t("toasters.success"))

			return setTimeout(() => {
				replace(EnumAppRoute.EMAIL_CONFIRMATION)
			}, 2000)
		} catch (err) {
			const { errMsg } = errorCatch(err as AxiosError)
			const msg = t("toasters.error", { e: errMsg })
			return onError(msg)
		}
	}

	const onSubmit = form.handleSubmit(onSubmitFunc)

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key === "Enter" && !isDisabled()) {
			e.preventDefault()

			if (currentPart === "main") return onClickToNext()
			else if (currentPart === "optional") return onSubmitFunc(form.getValues())
		}
	}

	useEffect(() => {
		window.addEventListener("keydown", onKeydown)

		return () => {
			window.removeEventListener("keydown", () => {})
		}
	}, [])

	return {
		dataStatus,
		isActive,
		isError,
		onSubmit,
		onRecaptchaChange,
		onClickToNext,
		onClickToPrevious,
		form,
		currentPart,
		isCreateAccLoading,
		isDisabled: isDisabled(),
		recaptchaRef,
		t
	}
}
