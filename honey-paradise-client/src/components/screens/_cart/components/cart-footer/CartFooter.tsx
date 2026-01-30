import { useTranslations } from "next-intl"
import type { FC } from "react"

import { Button } from "@/components/ui/common"
import { useCreateOrderS } from "@/services/hooks/order/useCreateOrderS"
import type { GetMyCartResponseCurrency } from "@/shared/types/server"

import { CartFooterInfo } from "./CartFooterInfo"
import { CartPrint } from "./CartPrint"
import { CartPromoCode } from "./CartPromoCode"
import { CartTable } from "./CartTable"

interface IProps {
	length?: number
	total?: number
	discount?: number
	currency?: GetMyCartResponseCurrency
	isLoading: boolean
}

const CartFooter: FC<IProps> = ({ length, ...props }) => {
	const t = useTranslations("global.cart.content")
	const { createOrder, isCreatingOrder } = useCreateOrderS()

	return (
		<section className="grid w-full grid-cols-[2fr_1fr] rounded-md bg-primary px-4 py-3 print:!block">
			<CartFooterInfo length={length} {...props} />

			<div className="print:hidden">
				<CartPromoCode isLoading={props.isLoading} />

				<div className="mb-3 flex items-center justify-between">
					<CartPrint />

					<CartTable />
				</div>

				<Button
					variant="secondary"
					className="w-full py-2 text-base"
					title={t("actions.confirmOrder")}
					disabled={(length ? length < 1 : true) || isCreatingOrder}
					isLoading={isCreatingOrder}
					onClick={() => createOrder()}
				>
					{t("actions.confirmOrder")}
				</Button>
			</div>
		</section>
	)
}

export { CartFooter }
