import { MotionSkeleton } from "@/components/ui/common";
import { ProductCardLoading } from "./product-card/ProductCardLoading";

const CategoryLoading = () => {
	return (
		<section className="py-3 px-6">
			<MotionSkeleton initial={false} exit={{ opacity: 0, y: -15, display: "none" }} className="w-52 h-7 mb-2" />

			<div className="flex gap-x-10 gap-y-3 flex-wrap">
				{new Array(3).fill(0).map((_, i) => (
					<ProductCardLoading key={i} />
				))}
			</div>
		</section>
	);
};

export { CategoryLoading };
