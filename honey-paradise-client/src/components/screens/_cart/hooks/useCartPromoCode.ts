import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosError } from "axios"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { usePromoCodeS } from "@/services/hooks/cart"
import {
	promoCodeSchema,
	TPromoCodeFields
} from "@/shared/lib/schemas/promo-code.schema"

export const useCartPromoCode = () => {
	const t = useTranslations("global.cart.content")

	const { usePromoCodeAsync, isPromoCodeUsing } = usePromoCodeS()

	const form = useForm<TPromoCodeFields>({
		mode: "onSubmit",
		resolver: zodResolver(promoCodeSchema),
		defaultValues: { promoCode: "" }
	})

	const onSubmit = async (data: TPromoCodeFields) => {
		try {
			await usePromoCodeAsync({ code: data.promoCode })
			toast.success("Код успешно применен!")
			form.reset()
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError)
			if (errMsg)
				form.setError(
					"promoCode",
					{ message: errMsg, type: "validate" },
					{ shouldFocus: true }
				)
		}
	}

	return {
		t,
		form,
		onSubmit: form.handleSubmit(onSubmit),
		isPromoCodeUsing
	}
}
