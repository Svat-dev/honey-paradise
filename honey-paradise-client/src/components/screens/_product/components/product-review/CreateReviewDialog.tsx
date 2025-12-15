import { Button, Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger, StarRating } from "@/components/ui/common";
import { BoldIcon, ItalicIcon, Link2 } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import type { FC, PropsWithChildren } from "react";

import { FormInput } from "@/components/ui/components/form-input";
import dynamic from "next/dynamic";
import { FormProvider } from "react-hook-form";
import { useCreateReviewDialog } from "../../hooks/useCreateReviewDialog";

const DynamicCreateReviewPreviewDM = dynamic(() => import("./CreateReviewPreviewDM").then(mod => mod.CreateReviewPreviewDM), {
	ssr: false,
});

interface ICreateReviewDialogProps extends PropsWithChildren {
	productId: string;
}

const CreateReviewDialog: FC<ICreateReviewDialogProps> = ({ children, productId }) => {
	const {
		form,
		rating,
		comment,
		ratingError,
		ratingListData,
		isOpen,
		setIsOpen,
		isCreatingProductReview,
		applyStyle,
		handleSelect,
		handleChangeRating,
		handleFormSubmit,
		handlePointerDown,
		handlePointerMove,
	} = useCreateReviewDialog(productId);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DialogContent className="!max-w-[40rem]">
				<DialogTitle>Добавление отзыва</DialogTitle>

				<DialogDescription className="mb-2">Оставьте отзыв, чтобы другие пользователи узнали о вашем опыте</DialogDescription>

				<FormProvider {...form}>
					<form onSubmit={handleFormSubmit}>
						<ul
							className="relative flex gap-4 max-w-[36.5rem] max-h-20 overflow-hidden cursor-pointer mb-10"
							onPointerDown={handlePointerDown}
							onPointerMove={handlePointerMove}
						>
							{ratingListData.map(({ text, field }) => (
								<li key={field} className="flex flex-col items-center gap-1 bg-secondary p-2 w-fit rounded-2xl select-none">
									<p className="whitespace-nowrap">{text}</p>
									<StarRating
										bgColor="#4d4d4d50"
										color="#ffd700"
										rating={rating[field]}
										onChangeRating={rate => handleChangeRating(rate, field)}
									/>
								</li>
							))}

							<div className="from-primary via-primary/80 to-primary/50 sticky -translate-y-2 -right-2 z-10 h-24 w-8 shrink-0 bg-gradient-to-l blur-sm pointer-events-none" />
						</ul>

						<FormInput
							name="comment"
							label="Ваш комментарий"
							containerClassName="mb-12"
							textareaProps={{ onSelect: handleSelect, className: "!pl-2 !pr-7 !py-2", rows: 12, maxLength: 500, counter: true }}
						>
							<div className="absolute right-1 -bottom-10">
								<Button variant="ghost" className="!p-2 hover:!bg-muted/30" title="Жирный текст" onClick={() => applyStyle("bold")}>
									<BoldIcon size={20} />
								</Button>

								<Button variant="ghost" className="!p-2 hover:!bg-muted/30" title="Курсивный текст" onClick={() => applyStyle("italic")}>
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

						<Button variant="secondary" type="submit" className="p-3" isLoading={isCreatingProductReview}>
							Опубликовать отзыв
						</Button>

						<AnimatePresence>
							{ratingError && (
								<m.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="ml-3 text-sm text-red-500">
									{ratingError}
								</m.span>
							)}
						</AnimatePresence>
					</form>
				</FormProvider>
			</DialogContent>
		</Dialog>
	);
};

export { CreateReviewDialog };
