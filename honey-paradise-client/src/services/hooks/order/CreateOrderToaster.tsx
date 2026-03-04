import { useRouter } from "next/navigation"
import { type FC, useEffect, useState } from "react"

import type { CreateOrderResponse } from "@/shared/types/server"

interface IProps extends CreateOrderResponse {}

const CreateOrderToaster: FC<IProps> = ({ totalAmount, confirmation_url }) => {
	const { push } = useRouter()
	const [timer, setTimer] = useState<number>(3)

	useEffect(() => {
		if (timer <= -1) {
			push(confirmation_url)
			return
		}

		const timeout = setTimeout(() => {
			setTimer(prev => prev - 0.5)
		}, 500)

		return () => {
			clearTimeout(timeout)
		}
	}, [timer])

	const progressWidth = (timer / 3) * 100

	return (
		<div>
			<p className="font-medium">Заказ на {totalAmount} долларов создан!</p>
			<p className="text-sm text-muted">Переход на страницу оплаты...</p>

			<div className="absolute bottom-0 left-0 h-1 w-full overflow-hidden rounded-full bg-gray-400">
				<div
					className="h-full bg-muted transition-all duration-500 ease-linear will-change-auto"
					style={{ width: `${progressWidth}%` }}
				/>
			</div>
		</div>
	)
}

export { CreateOrderToaster }
