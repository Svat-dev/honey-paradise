import { Skeleton } from "@/components/ui/common";
import { m } from "motion/react";

const ProductCardLoading = () => {
	return (
		<m.article
			initial={false}
			exit={{ opacity: 0, y: -15, display: "none" }}
			className="relative grid bg-primary rounded-md p-5 pt-4 w-[350px]"
		>
			<Skeleton className="h-52 w-full mb-3" />
			<Skeleton className="h-6 w-1/2 mb-2" />

			<div className="mb-3">
				<Skeleton className="h-4 w-full mb-2" />
				<Skeleton className="h-4 w-3/4 mb-2" />
			</div>

			<div className="flex items-center gap-3 mb-2">
				<Skeleton className="h-5 w-10" />
				<Skeleton className="h-5 w-20" />
			</div>

			<div className="flex items-center gap-3">
				<Skeleton className="h-5 w-14" />
				<Skeleton className="h-5 w-14" />
			</div>
		</m.article>
	);
};

export { ProductCardLoading };
