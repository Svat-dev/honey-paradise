import { format } from "date-fns"

import type { FC } from "react"

interface ICartOnlyPrint {
	totalPrice: string
}

const CartOnlyPrint: FC<ICartOnlyPrint> = ({ totalPrice }) => {
	const date = new Date()
	const formattedDate = format(date, "dd.MM.yyyy HH:mm")

	return (
		<div className="text-sm hidden justify-between whitespace-nowrap print:block" aria-hidden>
			<p>Стоимость товаров актуальна на момент печати {formattedDate}</p>

			<strong>Общая стоимость (+ доставка): {totalPrice}</strong>
		</div>
	)
}

export { CartOnlyPrint }
