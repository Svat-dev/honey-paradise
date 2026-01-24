import { useTranslations } from "next-intl"
import type { FC } from "react"

import { Skeleton, Title } from "@/components/ui/common"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import type { GetMyCartResponseCurrency } from "@/shared/types/server"

import { CartOnlyPrint } from "../CartOnlyPrint"

interface IProps {
	total?: number
	discount?: number
	length?: number
	currency?: GetMyCartResponseCurrency
	isLoading: boolean
}

const CartFooterInfo: FC<IProps> = ({
	currency,
	discount,
	length,
	total,
	isLoading
}) => {
	const t = useTranslations("global.cart.content")

	const { getPrice } = useGetPrice(currency)
	const deliveryPrice = 5

	return (
		<>
			<CartOnlyPrint
				totalPrice={getPrice(
					(total || 0) - (total || 0) * (discount || 0) + deliveryPrice,
					true,
					false
				)}
			/>

			<div className="print:hidden">
				<Title size="md" className="mb-2 text-2xl font-semibold">
					{t("footer.title")}
				</Title>

				<div className="mb-2 ml-1 flex text-lg">
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
						txt1: chunks => (
							<span className="flex items-center gap-1 font-semibold">
								{chunks}&nbsp;
							</span>
						),
						txt2: chunks => <span>{chunks}&nbsp;</span>,
						txt3: chunks => <span className="font-medium">{chunks}</span>,
						loader1: () => <Skeleton className="h-5 w-6" />,
						loader2: () => <Skeleton className="h-5 w-16" />
					})}
				</div>

				<ul className="flex list-none flex-col gap-1">
					{isLoading ? (
						<Skeleton className="ml-1 h-7 w-64" />
					) : discount && discount > 0 ? (
						<li className="ml-1 flex text-lg">
							{t.rich("footer.discount", {
								title: chunks => (
									<Title size="sm" className="text-xl">
										{chunks}
										&nbsp;
									</Title>
								),
								txt: () => (
									<span className="font-medium">{discount * 100}%</span>
								)
							})}
						</li>
					) : undefined}

					{isLoading ? (
						<Skeleton className="ml-1 h-7 w-64" />
					) : (
						<li className="ml-1 flex text-lg">
							<Title size="sm" className="text-xl">
								Стоимость доставки: &nbsp;
							</Title>
							<span className="font-medium">
								{getPrice(deliveryPrice, true, true)}
							</span>
						</li>
					)}

					{isLoading ? (
						<Skeleton className="ml-1 h-7 w-64" />
					) : (
						<li className="ml-1 flex text-lg">
							<Title size="sm" className="text-xl">
								Общая сумма: &nbsp;
							</Title>
							<span className="font-medium">
								{getPrice(
									(total || 0) - (total || 0) * (discount || 0) + deliveryPrice,
									true,
									true
								)}
							</span>
						</li>
					)}
				</ul>
			</div>
		</>
	)
}

export { CartFooterInfo }
