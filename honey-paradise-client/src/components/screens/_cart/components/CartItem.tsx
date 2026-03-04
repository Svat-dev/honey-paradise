import { EqualIcon, TrashIcon, XIcon } from "lucide-react"
import { m } from "motion/react"
import type { FC } from "react"

import { Button, Title } from "@/components/ui/common"
import { CartCounter } from "@/components/ui/components/cart-counter/CartCounter"
import { ProductCardImages } from "@/components/ui/components/ProductCardImages"
import type {
	GetMyCartItemsResponse,
	GetMyCartResponseCurrency
} from "@/shared/types/server"

import { useCartItem } from "../hooks/useCartItem"

interface ICartItem extends GetMyCartItemsResponse {
	locale: "en" | "ru"
	currency: GetMyCartResponseCurrency
}

const CartItem: FC<ICartItem> = ({
	id,
	priceInUSD,
	productVariant,
	weight,
	quantity,
	locale,
	currency
}) => {
	const {
		product: { slug, title, images },
		art
	} = productVariant

	const { deleteCartItem, getPrice, isDeleting, isLoading, t } =
		useCartItem(currency)

	return (
		<m.div
			initial={{ opacity: 0.3, y: -10 }}
			variants={{
				loading: { opacity: 0.6, pointerEvents: 0 },
				default: { opacity: 1, y: 0 }
			}}
			animate={isLoading ? "loading" : ""}
			exit={{ opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0 }}
			whileInView={"default"}
			viewport={{ once: true, amount: 0.5 }}
			transition={{ duration: 0.4, type: "tween" }}
			className="grid grid-cols-[auto_1fr_min-content] items-center gap-5 bg-primary p-3 shadow-md print:justify-between"
		>
			<ProductCardImages
				images={images}
				slug={`${slug}-${art}`}
				width={160}
				height={112}
				className="h-28 w-40 rounded-md border border-muted"
			/>

			<div className="flex flex-col gap-0.5">
				<Title size="sm" className="text-[22px]">
					{title[locale]}
				</Title>

				<p className="flex items-center">
					{getPrice(priceInUSD, true, true)}&nbsp;
					<XIcon size={16} />
					&nbsp;{quantity} шт.&nbsp;
					<EqualIcon size={16} />
					&nbsp;
					{getPrice(priceInUSD * quantity, true, true)}
				</p>

				<p>
					Общий вес:&nbsp;
					<span className="font-medium">{(weight * quantity) / 1000} кг</span>
				</p>
			</div>

			<div className="flex flex-col items-end gap-3">
				<CartCounter id={id} size={14} quantity={quantity} />

				<Button
					variant="destructive"
					className="group w-[35%] justify-start gap-2 overflow-hidden px-2 py-1.5 will-change-auto hover:w-full print:!hidden"
					title={t("labels.delete")}
					disabled={isLoading}
					isLoading={isDeleting}
					onClick={() => deleteCartItem(id)}
				>
					<TrashIcon size={20} />
					<span className="hidden animate-show-effect opacity-0 will-change-auto group-hover:inline">
						{t("actions.delete")}
					</span>
				</Button>
			</div>
		</m.div>
	)
}

export { CartItem }
