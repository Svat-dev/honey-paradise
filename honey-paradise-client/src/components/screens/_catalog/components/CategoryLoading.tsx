import { MotionSkeleton } from "@/components/ui/common"

import { ProductCardLoading } from "./product-card/ProductCardLoading"

const CategoryLoading = () => {
	return (
		<section className="px-6 py-3">
			<MotionSkeleton
				initial={false}
				exit={{ opacity: 0, y: -15, display: "none" }}
				className="mb-2 h-7 w-52"
			/>

			<div className="flex flex-wrap gap-x-10 gap-y-3">
				{new Array(3).fill(0).map((_, i) => (
					<ProductCardLoading key={i} />
				))}
			</div>
		</section>
	)
}

export { CategoryLoading }
