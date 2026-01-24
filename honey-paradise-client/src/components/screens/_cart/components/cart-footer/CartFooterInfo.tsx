import { useTranslations } from "next-intl"

import { Skeleton, Title } from "@/components/ui/common"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"

import { CartOnlyPrint } from "../CartOnlyPrint"

import type { GetMyCartResponseCurrency } from "@/shared/types/server"
import type { FC } from "react"
interface IProps {
	total?: number
	discount?: number
	length?: number
	currency?: GetMyCartResponseCurrency
	isLoading: boolean
}

const CartFooterInfo: FC<IProps> = ({ currency, discount, length, total, isLoading }) => {
	const t = useTranslations("global.cart.content")

	const { getPrice } = useGetPrice(currency)
	const deliveryPrice = 5

	return (
		<>
			<CartOnlyPrint totalPrice={getPrice((total || 0) - (total || 0) * (discount || 0) + deliveryPrice, true, false)} />

			<div className="print:hidden">
				<Title size="md" className="font-semibold text-2xl mb-2">
					{t("footer.title")}
				</Title>

				<div className="flex ml-1 mb-2 text-lg">
					{t.rich("footer.amount", {
						isLoading: String(isLoading),
						length: length || 0,
						total: getPrice(total || 0, true, true),
						title: chunks => (
							<Title size="sm" className="text-xl">
								{chunks}
								&nbsp;
							</Title>
						),
						txt1: chunks => <span className="flex items-center font-semibold gap-1">{chunks}&nbsp;</span>,
						txt2: chunks => <span>{chunks}&nbsp;</span>,
						txt3: chunks => <span className="font-medium">{chunks}</span>,
						loader1: () => <Skeleton className="w-6 h-5" />,
						loader2: () => <Skeleton className="h-5 w-16" />
					})}
				</div>

				<ul className="flex flex-col gap-1 list-none">
					{isLoading ? (
						<Skeleton className="h-7 w-64 ml-1" />
					) : discount && discount > 0 ? (
						<li className="flex ml-1 text-lg">
							{t.rich("footer.discount", {
								title: chunks => (
									<Title size="sm" className="text-xl">
										{chunks}
										&nbsp;
									</Title>
								),
								txt: () => <span className="font-medium">{discount * 100}%</span>
							})}
						</li>
					) : undefined}

					{isLoading ? (
						<Skeleton className="h-7 w-64 ml-1" />
					) : (
						<li className="flex ml-1 text-lg">
							<Title size="sm" className="text-xl">
								Стоимость доставки: &nbsp;
							</Title>
							<span className="font-medium">{getPrice(deliveryPrice, true, true)}</span>
						</li>
					)}

					{isLoading ? (
						<Skeleton className="h-7 w-64 ml-1" />
					) : (
						<li className="flex ml-1 text-lg">
							<Title size="sm" className="text-xl">
								Общая сумма: &nbsp;
							</Title>
							<span className="font-medium">{getPrice((total || 0) - (total || 0) * (discount || 0) + deliveryPrice, true, true)}</span>
						</li>
					)}
				</ul>
			</div>
		</>
	)
}

export { CartFooterInfo }
