import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react"
import type { FC } from "react"

import { cn } from "@/shared/lib/utils/base"
import type { ICNProps } from "@/shared/types"

import { Button } from "../../common"
import { useCartCounter } from "../hooks/useCartCounter"

interface IProps extends ICNProps {
	id: string
	quantity?: number
	canDelete?: boolean
}

const CartCounter: FC<IProps> = ({
	className,
	id,
	quantity,
	canDelete = false
}) => {
	const { t, changeQuantity, amount, isLoading } = useCartCounter(
		id,
		canDelete,
		quantity
	)

	return (
		<div className={cn("flex items-center gap-2", className)}>
			<Button
				variant="secondary"
				className="px-4 py-3 print:!hidden"
				title={t("counter.-", { state: String(amount <= 1 && canDelete) })}
				disabled={isLoading || (!canDelete && amount <= 1)}
				onClick={() => changeQuantity("decrease", id)}
			>
				{amount > 1 || !canDelete ? (
					<MinusIcon size={16} />
				) : (
					<TrashIcon size={16} />
				)}
			</Button>

			<span>{amount}</span>

			<Button
				variant="secondary"
				className="px-4 py-3 print:!hidden"
				title={t("counter.+")}
				disabled={isLoading}
				onClick={() => changeQuantity("increase", id)}
			>
				<PlusIcon size={16} />
			</Button>
		</div>
	)
}

export { CartCounter }
