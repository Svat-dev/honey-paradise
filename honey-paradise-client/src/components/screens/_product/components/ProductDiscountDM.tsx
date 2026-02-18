import { useTranslations } from "next-intl"
import type { FC, PropsWithChildren } from "react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	Separator,
	Title
} from "@/components/ui/common"
import type { GetProductBySlugResponseDiscount } from "@/shared/types/server"

interface IProps extends PropsWithChildren {
	discounts: GetProductBySlugResponseDiscount[]
	priceInUsd: number
	totalPrice: number
	getPrice: (price: number) => string
}

const ProductDiscountDM: FC<IProps> = ({
	children,
	priceInUsd,
	totalPrice,
	discounts,
	getPrice
}) => {
	const t = useTranslations("global.product.content.price")

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

			<DropdownMenuContent className="!p-2">
				<Title size="xs" className="mb-2 font-medium">
					{t("info")}
				</Title>

				<div className="mb-0.5 flex items-center gap-3">
					<span>{t("fullPrice")}:</span>
					{getPrice(priceInUsd)}
				</div>

				{discounts.map(({ id, type, discount }) => (
					<div
						key={id}
						className="mb-0.5 flex w-full items-center justify-between"
					>
						<span className="whitespace-nowrap">
							{t(`discounts.${type.toLowerCase()}` as any)}
						</span>
						<span className="text-muted">
							-{getPrice(priceInUsd * discount).slice(1)}
						</span>
					</div>
				))}

				<Separator orientation="horizontal" className="my-2" />

				<p>
					<span className="font-medium">{t("total")}:</span>
					&nbsp;{getPrice(totalPrice)}
				</p>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { ProductDiscountDM }
