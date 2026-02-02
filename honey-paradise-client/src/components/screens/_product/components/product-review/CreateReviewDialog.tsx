import { BoldIcon, ItalicIcon, Link2, TrashIcon } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import dynamic from "next/dynamic"
import type { FC, PropsWithChildren } from "react"
import { FormProvider } from "react-hook-form"

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
	StarRating
} from "@/components/ui/common"
import { FormInput } from "@/components/ui/components/form-input"
import { VALUES } from "@/shared/lib/constants/base"
import type { TCreateReviewSchema } from "@/shared/lib/schemas/create-review.schema"

import { useCreateReviewDialog } from "../../hooks/useCreateReviewDialog"

const DynamicCreateReviewPreviewDM = dynamic(
	() =>
		import("./CreateReviewPreviewDM").then(mod => mod.CreateReviewPreviewDM),
	{
		ssr: false
	}
)

interface ICreateReviewDialogProps extends PropsWithChildren {
	productId: string
	reviewId: string
	type: "create" | "edit"
	defaultValue?: Partial<TCreateReviewSchema>
}

const CreateReviewDialog: FC<ICreateReviewDialogProps> = ({
	children,
	productId,
	reviewId,
	type,
	defaultValue
}) => {
	const {
		form,
		rating,
		comment,
		ratingError,
		ratingListData,
		isOpen,
		setIsOpen,
		isCreatingProductReview,
		isEditingReview,
		applyStyle,
		handleSelect,
		handleChangeRating,
		handleFormSubmit,
		handlePointerDown,
		handlePointerMove
	} = useCreateReviewDialog(productId, reviewId, type, defaultValue)

	const isCreate = type === "create"

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className="!max-w-[40rem]">
				<DialogTitle>
					{isCreate ? "Добавление отзыва" : "Редактирование отзыва"}
				</DialogTitle>

				<DialogDescription className="mb-2">
					{isCreate
						? "Оставьте отзыв, чтобы другие пользователи узнали о вашем опыте"
						: "Отредактируйте свой отзыв как захотите!"}
				</DialogDescription>

				<FormProvider {...form}>
					<form onSubmit={handleFormSubmit}>
						<ul
							className="relative mb-10 flex max-h-20 max-w-[36.5rem] cursor-pointer gap-4 overflow-hidden"
							onPointerDown={handlePointerDown}
							onPointerMove={handlePointerMove}
						>
							{ratingListData.map(({ text, field }) => (
								<li
									key={field}
									className="flex w-fit select-none flex-col items-center gap-1 rounded-2xl bg-secondary p-2"
								>
									<div className="flex w-full items-center justify-between whitespace-nowrap">
										<p>{text}</p>
										{field !== "common" && (
											<Button
												variant="ghost"
												className="hover:!text-muted"
												onClick={() => handleChangeRating(0, field)}
												disabled={rating[field] === 0}
											>
												<TrashIcon size={18} />
											</Button>
										)}
									</div>
									<StarRating
										bgColor="#4d4d4d50"
										color="#ffd700"
										rating={rating[field]}
										onChangeRating={rate => handleChangeRating(rate, field)}
										animate={false}
									/>
								</li>
							))}

							<div className="pointer-events-none sticky -right-2 z-10 h-24 w-8 shrink-0 -translate-y-2 bg-gradient-to-l from-primary via-primary/80 to-primary/50 blur-sm" />
						</ul>

						<FormInput
							name="comment"
							label="Ваш комментарий"
							containerClassName="mb-12"
							textareaProps={{
								onSelect: handleSelect,
								className: "!pl-2 !pr-7 !py-2",
								rows: 12,
								maxLength: VALUES.MAX_REVIEW_LENGTH,
								counter: true
							}}
						>
							<div className="absolute -bottom-10 right-1">
								<Button
									variant="ghost"
									className="!p-2 hover:!bg-muted/30"
									title="Жирный текст"
									onClick={() => applyStyle("bold")}
								>
									<BoldIcon size={20} />
								</Button>

								<Button
									variant="ghost"
									className="!p-2 hover:!bg-muted/30"
									title="Курсивный текст"
									onClick={() => applyStyle("italic")}
								>
									<ItalicIcon size={20} />
								</Button>

								<Button
									variant="ghost"
									className="!p-2 hover:!bg-muted/30"
									title="Сделать текст ссылкой"
									onClick={() => applyStyle("link")}
								>
									<Link2 size={20} />
								</Button>

								<DynamicCreateReviewPreviewDM comment={comment} />
							</div>
						</FormInput>

						<Button
							variant="secondary"
							type="submit"
							className="p-3"
							isLoading={isCreatingProductReview || isEditingReview}
						>
							{isCreate ? "Опубликовать отзыв" : "Сохранить изменения"}
						</Button>

						<AnimatePresence>
							{ratingError && (
								<m.span
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="ml-3 text-sm text-red-500"
								>
									{ratingError}
								</m.span>
							)}
						</AnimatePresence>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	)
}

export { CreateReviewDialog }
