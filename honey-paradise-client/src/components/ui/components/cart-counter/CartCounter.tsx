import type { FC } from "react"

import { cn } from "@/shared/lib/utils/base"
import type { ICNProps } from "@/shared/types"

import { Button } from "../../common"
import { useCartCounter } from "../hooks/useCartCounter"

interface IProps extends ICNProps {
	id: string
	quantity?: number
}

const CartCounter: FC<IProps> = ({ className, id, quantity }) => {
	const { t, changeQuantity, amount, isLoading } = useCartCounter(id, quantity)

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Button
				variant="secondary"
				className="px-4 py-3 print:!hidden"
				title={t("counter.-")}
				disabled={isLoading || amount <= 1}
				onClick={() => changeQuantity("decrease", id)}
			>
				-
			</Button>

			<span>{amount}</span>

			<Button
				variant="secondary"
				className="px-4 py-3 print:!hidden"
				title={t("counter.+")}
				disabled={isLoading}
				onClick={() => changeQuantity("increase", id)}
			>
				+
			</Button>
		</div>
	)
}

export { CartCounter }
