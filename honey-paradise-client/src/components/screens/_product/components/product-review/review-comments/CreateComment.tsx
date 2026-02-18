import { ReplyIcon, XIcon } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import type { FC } from "react"
import { FormProvider } from "react-hook-form"

import { Button } from "@/components/ui/common"
import { FormInput } from "@/components/ui/components/form-input"
import { VALUES } from "@/shared/lib/constants/base"

import { useCreateComment } from "../../../hooks/useCreateComment"

interface IProps {
	reviewId: string
	replyId: string | undefined
	deleteReplyId: VoidFunction
}

const CreateComment: FC<IProps> = ({ reviewId, replyId, deleteReplyId }) => {
	const { t, form, onSubmit, handleHighlight, isLoading } = useCreateComment(
		reviewId,
		replyId
	)

	return (
		<FormProvider {...form}>
			<form onSubmit={onSubmit} className="my-4 flex flex-col">
				<a id={`comment-input-${reviewId}`} />

				<FormInput
					name="comment"
					textareaProps={{
						className: "!px-3 !py-2 border border-muted !resize-y",
						counter: true,
						maxLength: VALUES.MAX_COMMENT_LENGTH,
						rows: 4
					}}
					containerClassName="mb-2"
				/>

				<div className="relative mb-3 flex items-center justify-end gap-2">
					<AnimatePresence mode="sync">
						{!!replyId && (
							<m.div
								initial={{ y: 10, opacity: 0.6, top: 0 }}
								animate={{
									y: 0,
									opacity: 1,
									top: form.formState.errors["comment"] ? "1.25rem" : 0
								}}
								exit={{ y: 10, opacity: 0 }}
								transition={{ type: "keyframes", duration: 0.3 }}
								className="absolute left-1 flex items-center gap-1"
							>
								<Button
									variant="secondary"
									title={t("comments.reply.default")}
									className="rounded-xl p-1"
									onClick={handleHighlight}
								>
									<ReplyIcon size={20} className="mb-1 mr-1" />
									{t("comments.reply.default")}
								</Button>

								<Button
									variant="ghost"
									title={t("comments.reply.delete")}
									className="p-1 hover:rotate-180"
									onClick={deleteReplyId}
								>
									<XIcon size={24} />
								</Button>
							</m.div>
						)}
					</AnimatePresence>

					<div />

					<Button
						variant="secondary"
						title={t("comments.create")}
						type="submit"
						className="self-end px-2 py-1.5"
						isLoading={isLoading}
					>
						{t("comments.create")}
					</Button>
				</div>
			</form>
		</FormProvider>
	)
}

export { CreateComment }
