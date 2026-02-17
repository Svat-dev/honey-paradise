import type { FC } from "react"

import { Button, Skeleton } from "@/components/ui/common"
import { useProductContext } from "@/shared/lib/hooks/context"
import { useGetPrice } from "@/shared/lib/hooks/useGetPrice"
import { cn } from "@/shared/lib/utils/base"
import type { GetProductBySlugResponseVariant } from "@/shared/types/server"

interface IProductVariants {
	variants: GetProductBySlugResponseVariant[]
}

const ProductVariants: FC<IProductVariants> = ({ variants }) => {
	const { variantId, setVariantId, currency, loading } = useProductContext()
	const { getPrice } = useGetPrice(currency)

	return (
		<div className="flex w-full flex-wrap items-center gap-5 px-1">
			{variants.map(item => (
				<Button
					variant="default"
					key={item.id}
					className={cn("px-2 py-1.5 hover:!bg-black/25", {
						"bg-black/25 ring-1 ring-black": variantId === item.id
					})}
					onClick={() => setVariantId(item.id, item.article)}
				>
					{loading.default ? (
						<Skeleton className="h-5 w-10" />
					) : (
						<p>{item.weight / 1000} кг</p>
					)}
					&nbsp;|&nbsp;
					{loading.default ? (
						<Skeleton className="h-5 w-20" />
					) : (
						<span>{getPrice(item.priceInUsd, true, true)}</span>
					)}
				</Button>
			))}
		</div>
	)
}

export { ProductVariants }
