import { m } from "motion/react"

import { Skeleton } from "@/components/ui/common"

const ProductCardLoading = () => {
	return (
		<m.article
			initial={false}
			exit={{ opacity: 0, y: -15 }}
			className="relative grid w-[350px] rounded-md bg-primary p-5 pt-4"
		>
			<Skeleton className="mb-3 h-52 w-full" />
			<Skeleton className="mb-2 h-6 w-1/2" />

			<div className="mb-3">
				<Skeleton className="mb-2 h-4 w-full" />
				<Skeleton className="mb-2 h-4 w-3/4" />
			</div>

			<div className="mb-2 flex items-center gap-3">
				<Skeleton className="h-5 w-10" />
				<Skeleton className="h-5 w-20" />
			</div>

			<div className="flex items-center gap-3">
				<Skeleton className="h-5 w-14" />
				<Skeleton className="h-5 w-14" />
			</div>
		</m.article>
	)
}

export { ProductCardLoading }
