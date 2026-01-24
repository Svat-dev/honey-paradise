import { TableIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/common"
import { useCreateOrderS } from "@/services/hooks/order/useCreateOrderS"

import { CartFooterInfo } from "./CartFooterInfo"
import { CartPrint } from "./CartPrint"
import { CartPromoCode } from "./CartPromoCode"

import type { GetMyCartResponseCurrency } from "@/shared/types/server"
import type { FC } from "react"
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
		<section className="grid grid-cols-[2fr_1fr] w-full bg-primary py-3 px-4 rounded-md print:!block">
			<CartFooterInfo length={length} {...props} />

			<div className="print:hidden">
				<CartPromoCode isLoading={props.isLoading} />

				<div className="flex items-center justify-between mb-3">
					<CartPrint />

					<Button variant="link" title={t("footer.saveAsTable")} className="flex items-center gap-1 will-change-auto">
						<TableIcon size={20} />
						{t("footer.saveAsTable")}
					</Button>
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
