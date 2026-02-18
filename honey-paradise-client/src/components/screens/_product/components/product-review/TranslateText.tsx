import { m } from "motion/react"
import { useTranslations } from "next-intl"
import type { FC } from "react"

import { Markdown } from "@/components/ui/components/markdown"
import { cn } from "@/shared/lib/utils/base"

import type { ITranslateReviewState } from "../../types/translate-review.type"

interface ITranslateText {
	type: "review" | "comment"
	state: ITranslateReviewState
	isTranslating: boolean
}

const TranslateText: FC<ITranslateText> = ({
	type,
	state: { isTranslated, isVisible, text },
	isTranslating
}) => {
	const t = useTranslations("global.product.content.reviews.item")

	return (
		<m.div
			initial={false}
			animate={String(isVisible)}
			variants={{ true: { opacity: 1 }, false: { opacity: 0 } }}
			transition={{ type: "tween", duration: 0.15 }}
			className={cn("mb-3 ml-2 flex flex-col overflow-hidden", {
				"select-none !opacity-60": isTranslating
			})}
		>
			{type === "review" ? <Markdown children={text} /> : <p>{text}</p>}
			{isTranslated && (
				<p className="ml-2 self-end text-sm text-muted">{t("translated")}</p>
			)}
		</m.div>
	)
}

export { TranslateText }
