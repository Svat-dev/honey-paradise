import { zodResolver } from "@hookform/resolvers/zod"
import type { AxiosError } from "axios"
import { useLocale, useTranslations } from "next-intl"
import {
	type PointerEvent,
	type SyntheticEvent,
	useEffect,
	useMemo,
	useState
} from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"

import { errorCatch } from "@/api/api-helper"
import { useCreateProductReviewS } from "@/services/hooks/products/reviews/useCreateProductReviewS"
import { useEditReviewS } from "@/services/hooks/products/reviews/useEditReviewS"
import { EnumSessionStorageKeys } from "@/shared/lib/constants/base"
import { useDebounce } from "@/shared/lib/hooks/base"
import {
	createReviewSchema,
	type TCreateReviewSchema
} from "@/shared/lib/schemas/create-review.schema"
import { getMarkdownByTextStyle } from "@/shared/lib/utils"

import type { IRatingListData } from "../types/create-review.type"

export const useCreateReviewDialog = (
	productId: string,
	reviewId: string,
	type: "create" | "edit",
	defaultValue?: Partial<TCreateReviewSchema>
) => {
	const t = useTranslations("global.product.content.reviews.item.createDialog")
	const st = useTranslations("global.product.content.schema")
	const locale = useLocale()

	const { createProductReviewAsync, isCreatingProductReview } =
		useCreateProductReviewS()
	const { editReviewAsync, isEditingReview } = useEditReviewS()

	const form = useForm<TCreateReviewSchema>({
		resolver: zodResolver(createReviewSchema(st)),
		mode: "onChange",
		defaultValues:
			type === "create"
				? {
						comment: "",
						rating: { common: 0, taste: 0, aroma: 0, packaging: 0 }
					}
				: defaultValue
	})

	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isScrolling, setIsScrolling] = useState<boolean>(false)
	const [startPosition, setStartPosition] = useState<number>(0)

	const [selectionStart, setSelectionStart] = useState<number | null>(null)
	const [selectionEnd, setSelectionEnd] = useState<number | null>(null)

	const ratingListData: IRatingListData[] = useMemo(
		() => [
			{
				text: t("rating.common"),
				field: "common"
			},
			{
				text: t("rating.aroma"),
				field: "taste"
			},
			{
				text: t("rating.taste"),
				field: "aroma"
			},
			{
				text: t("rating.packaging"),
				field: "packaging"
			}
		],
		[locale]
	)

	const rating = form.watch("rating")
	const comment = useDebounce(form.watch("comment"), 300)

	const ratingError = form.formState.errors.rating?.common?.message

	const handlePointerDown = (e: PointerEvent<HTMLUListElement>) => {
		setStartPosition(e.pageX)
		setIsScrolling(true)
	}

	const handlePointerMove = (e: PointerEvent<HTMLUListElement>) => {
		if (!isScrolling) return
		e.currentTarget.scroll({
			behavior: "smooth",
			left: startPosition - e.pageX
		})
	}

	const handleChangeRating = (
		value: number,
		field: keyof TCreateReviewSchema["rating"]
	) => {
		if (field === "common") form.clearErrors("rating.common")
		form.setValue(`rating.${field}`, value)
	}

	const handleFormSubmit = async (data: TCreateReviewSchema) => {
		try {
			const dto = { text: data.comment, rating: data.rating }

			if (type === "create") {
				await createProductReviewAsync({ ...dto, productId })
				toast.success("Отзыв успешно оставлен")

				const data: Record<string, string> = JSON.parse(
					sessionStorage.getItem(EnumSessionStorageKeys.CREATE_REVIEW_MODAL) ||
						"{}"
				)

				if (Object.keys(data).length <= 1)
					sessionStorage.removeItem(EnumSessionStorageKeys.CREATE_REVIEW_MODAL)
				else {
					if (productId in data) {
						delete data[productId]
						sessionStorage.setItem(
							EnumSessionStorageKeys.CREATE_REVIEW_MODAL,
							JSON.stringify(data)
						)
					}
				}
			} else {
				await editReviewAsync({ ...dto, reviewId: reviewId || "" })
				toast.success("Отзыв успешно изменен!")
			}

			setIsOpen(false)
			form.reset()
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError)
			toast.error(errMsg)
		}
	}

	const handleSelect = (e: SyntheticEvent<HTMLTextAreaElement, Event>) => {
		setSelectionStart(e.currentTarget.selectionStart)
		setSelectionEnd(e.currentTarget.selectionEnd)
	}

	const applyStyle = (type: "bold" | "italic" | "link") => {
		if (!selectionStart || !selectionEnd) return

		const value = form.getValues("comment")
		const formatted = getMarkdownByTextStyle(
			type,
			value.slice(selectionStart, selectionEnd)
		)
		const newComment =
			value.slice(0, selectionStart) + formatted + value.slice(selectionEnd)

		form.setValue("comment", newComment, { shouldValidate: true })

		setSelectionStart(null)
		setSelectionEnd(null)
	}

	const onKeydown = (e: KeyboardEvent) => {
		if (selectionEnd === null || selectionStart === null) return

		if (e.ctrlKey && e.key === "b") {
			e.preventDefault()
			applyStyle("bold")
		} else if (e.ctrlKey && e.key === "i") {
			e.preventDefault()
			applyStyle("italic")
		} else if (e.ctrlKey && e.key === "l") {
			e.preventDefault()
			applyStyle("link")
		}
	}

	useEffect(() => {
		if (!isScrolling) return

		window.addEventListener("pointerup", () => {
			setStartPosition(0)
			setIsScrolling(false)
		})

		return () => {
			window.removeEventListener("pointerup", () => {})
		}
	}, [isScrolling])

	useEffect(() => {
		if (!isOpen || type !== "create") return
		const data: Record<string, string> = JSON.parse(
			sessionStorage.getItem(EnumSessionStorageKeys.CREATE_REVIEW_MODAL) || "{}"
		)

		data[productId] = comment
		console.log(data)

		sessionStorage.setItem(
			EnumSessionStorageKeys.CREATE_REVIEW_MODAL,
			JSON.stringify(data)
		)
	}, [comment])

	useEffect(() => {
		window.addEventListener("keydown", onKeydown)

		return () => {
			try {
				window.removeEventListener("keydown", onKeydown)
			} catch (error) {
				console.error(error)
			}
		}
	})

	useEffect(() => {
		if (type !== "create") return

		const storedData: Record<string, string> = JSON.parse(
			sessionStorage.getItem(EnumSessionStorageKeys.CREATE_REVIEW_MODAL) || "{}"
		)

		if (storedData) form.setValue("comment", storedData[productId] || "")
	}, [])

	return {
		t,
		form,
		isOpen,
		setIsOpen,
		ratingListData,
		rating,
		comment,
		ratingError,
		isCreatingProductReview,
		isEditingReview,
		applyStyle,
		handleSelect,
		handlePointerDown,
		handlePointerMove,
		handleChangeRating,
		handleFormSubmit: form.handleSubmit(handleFormSubmit)
	}
}
