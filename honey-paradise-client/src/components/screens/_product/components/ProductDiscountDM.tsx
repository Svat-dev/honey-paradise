import type { FC, PropsWithChildren } from "react"

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
	Separator,
	Title
} from "@/components/ui/common"
import {
	type GetProductBySlugResponseDiscount,
	GetProductBySlugResponseDiscountType
} from "@/shared/types/server"

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
	const getType = (type: GetProductBySlugResponseDiscountType) => {
		switch (type) {
			case "CATEGORY":
				return "Скидка категории"
			case "SEASON":
				return "Сезонная скидка"
			case "SELLOUT":
				return "Распродажа"
			case "VIP_CLUB":
				return "Скидка вип-клуба"
			default:
				return "Скидка"
		}
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>

			<DropdownMenuContent className="!p-2">
				<Title size="xs" className="mb-2 font-medium">
					Информация о цене товара
				</Title>

				<div className="mb-0.5 flex items-center gap-3">
					<span>Полная цена товара:</span>
					{getPrice(priceInUsd)}
				</div>

				{discounts.map(({ id, type, discount }) => (
					<div
						key={id}
						className="mb-0.5 flex w-full items-center justify-between"
					>
						<span className="whitespace-nowrap">{getType(type)}</span>
						<span className="text-muted">
							-{getPrice(priceInUsd * discount).slice(1)}
						</span>
					</div>
				))}

				<Separator orientation="horizontal" className="my-2" />

				<p>
					<span className="font-medium">Итого:</span>
					&nbsp;{getPrice(totalPrice)}
				</p>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export { ProductDiscountDM }
