import { type TCreateReviewSchema, createReviewSchema } from "@/shared/lib/schemas/create-review.schema";
import { type PointerEvent, type SyntheticEvent, useEffect, useMemo, useState } from "react";

import { errorCatch } from "@/api/api-helper";
import { useCreateProductReviewS } from "@/services/hooks/products/useCreateProductReviewS";
import { EnumSessionStorageKeys } from "@/shared/lib/constants/base";
import { useDebounce } from "@/shared/lib/hooks/base";
import { getMarkdownByTextStyle } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import type { IRatingListData } from "../types/create-review.type";

export const useCreateReviewDialog = (productId: string) => {
	const { locale } = useLanguage();
	const locale = useLocale();
	const { createProductReviewAsync, isCreatingProductReview } = useCreateProductReviewS();

	const form = useForm<TCreateReviewSchema>({
		resolver: zodResolver(createReviewSchema),
		mode: "onChange",
		defaultValues: {
			comment: "",
			rating: {
				common: 0,
				taste: 0,
				aroma: 0,
				packaging: 0,
			},
		},
	});

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isScrolling, setIsScrolling] = useState<boolean>(false);
	const [startPosition, setStartPosition] = useState<number>(0);

	const [selectionStart, setSelectionStart] = useState<number | null>(null);
	const [selectionEnd, setSelectionEnd] = useState<number | null>(null);

	const ratingListData: IRatingListData[] = useMemo(
		() => [
			{
				text: "Общая оценка товара",
				field: "common",
			},
			{
				text: "Оценка вкуса",
				field: "taste",
			},
			{
				text: "Оценка аромата",
				field: "aroma",
			},
			{
				text: "Оценка упаковки",
				field: "packaging",
			},
		],
		[locale]
	);

	const rating = form.watch("rating");
	const comment = useDebounce(form.watch("comment"), 300);

	const ratingError = form.formState.errors.rating?.common?.message;

	const handlePointerDown = (e: PointerEvent<HTMLUListElement>) => {
		setStartPosition(e.pageX);
		setIsScrolling(true);
	};

	const handlePointerMove = (e: PointerEvent<HTMLUListElement>) => {
		if (!isScrolling) return;
		e.currentTarget.scroll({ behavior: "smooth", left: startPosition - e.pageX });
	};

	const handleChangeRating = (value: number, field: keyof TCreateReviewSchema["rating"]) => {
		if (field === "common") form.clearErrors("rating.common");
		form.setValue(`rating.${field}`, value);
	};

	const handleFormSubmit = async (data: TCreateReviewSchema) => {
		try {
			await createProductReviewAsync({ text: data.comment, rating: data.rating, productId });

			toast.success("Отзыв успешно оставлен");

			setIsOpen(false);
			form.reset();
			sessionStorage.removeItem(EnumSessionStorageKeys.CREATE_REVIEW_MODAL);
		} catch (error) {
			const { errMsg } = errorCatch(error as AxiosError);
			toast.error(errMsg);
		}
	};

	const handleSelect = (e: SyntheticEvent<HTMLTextAreaElement, Event>) => {
		setSelectionStart(e.currentTarget.selectionStart);
		setSelectionEnd(e.currentTarget.selectionEnd);
	};

	const applyStyle = (type: "bold" | "italic" | "link") => {
		if (!selectionStart || !selectionEnd) return;

		const value = form.getValues("comment");
		const formatted = getMarkdownByTextStyle(type, value.slice(selectionStart, selectionEnd));
		const newComment = value.slice(0, selectionStart) + formatted + value.slice(selectionEnd);

		form.setValue("comment", newComment, { shouldValidate: true });

		setSelectionStart(null);
		setSelectionEnd(null);
	};

	useEffect(() => {
		if (!isScrolling) return;

		window.addEventListener("pointerup", () => {
			setStartPosition(0);
			setIsScrolling(false);
		});

		return () => {
			window.removeEventListener("pointerup", () => {});
		};
	}, [isScrolling]);

	useEffect(() => {
		if (!isOpen) return;
		sessionStorage.setItem(EnumSessionStorageKeys.CREATE_REVIEW_MODAL, JSON.stringify({ value: comment }));
	}, [comment]);

	useEffect(() => {
		const storedData = JSON.parse(sessionStorage.getItem(EnumSessionStorageKeys.CREATE_REVIEW_MODAL) || '{"value": ""}');

		if (storedData) form.setValue("comment", storedData.value);
	}, []);

	return {
		form,
		isOpen,
		setIsOpen,
		ratingListData,
		rating,
		comment,
		ratingError,
		isCreatingProductReview,
		applyStyle,
		handleSelect,
		handlePointerDown,
		handlePointerMove,
		handleChangeRating,
		handleFormSubmit: form.handleSubmit(handleFormSubmit),
	};
};
