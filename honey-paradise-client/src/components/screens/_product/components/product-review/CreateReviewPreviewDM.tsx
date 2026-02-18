import { AppWindowIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import type { FC } from "react"

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger
} from "@/components/ui/common"
import { Markdown } from "@/components/ui/components/markdown"

interface IProps {
	comment: string
}

const CreateReviewPreviewDM: FC<IProps> = ({ comment }) => {
	const t = useTranslations("global.product.content.reviews")

	return (
		<DropdownMenu>
			<DropdownMenuTrigger disabled={comment.length === 0} asChild>
				<Button
					variant="ghost"
					className="ml-2 p-2 hover:!bg-muted/30"
					title={t("item.createDialog.preview")}
					disabled={comment.length === 0}
				>
					<AppWindowIcon size={22} />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent side="top" className="w-[30rem]">
				<Markdown children={comment} />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { CreateReviewPreviewDM }
