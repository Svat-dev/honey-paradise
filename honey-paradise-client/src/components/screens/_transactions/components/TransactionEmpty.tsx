import { useTranslations } from "next-intl"
import Image from "next/image"

import { TableCell, TableRow } from "@/components/ui/common"

const TransactionEmpty = () => {
	const t = useTranslations("global.transactions.content")

	return (
		<TableRow
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			className="hover:bg-transparent"
		>
			<TableCell className="w-full" colSpan={5}>
				<div className="my-3 flex flex-col items-center justify-center">
					<Image
						src="/assets/not-found-notifications.webp"
						alt={t("labels.notFoundImage")}
						width={250}
						height={155}
						loading="lazy"
					/>
					<p className="text-center text-base leading-7">
						{t.rich("empty", { bt: () => <br /> })}
					</p>
				</div>
			</TableCell>
		</TableRow>
	)
}

export { TransactionEmpty }
