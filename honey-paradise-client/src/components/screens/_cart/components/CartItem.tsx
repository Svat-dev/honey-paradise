import { m } from "motion/react"
import Image from "next/image"
import type { FC } from "react"

import { Button, Title } from "@/components/ui/common"
import { CartCounter } from "@/components/ui/components/cart-counter/CartCounter"
import { getAssetsPath } from "@/shared/lib/utils"
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
	quantity,
	locale,
	currency
}) => {
	const {
		amount,
		changeQuantity,
		deleteCartItem,
		isLoading,
		isDeleting,
		getPrice,
		t
	} = useCartItem(currency, quantity)

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
			className="flex items-center gap-5 rounded-md bg-primary p-3 shadow-md print:justify-between"
		>
			<Image
				src={getAssetsPath(productVariant.product.images[0])}
				alt={productVariant.product.title[locale]}
				width={100}
				height={100}
			/>

			<Title size="sm" className="text-xl">
				{productVariant.product.title[locale]}
			</Title>

			<CartCounter id={id} quantity={quantity} />

			<span>{productVariant.weight / 1000} кг</span>

			<span>{getPrice(priceInUSD, true, true)}</span>

			<Button
				variant="secondary"
				className="px-2 py-1.5 print:!hidden"
				title={t("labels.delete")}
				disabled={isLoading}
				isLoading={isDeleting}
				onClick={() => deleteCartItem(id)}
			>
				{t("actions.delete")}
			</Button>
		</m.div>
	)
}

export { CartItem }
