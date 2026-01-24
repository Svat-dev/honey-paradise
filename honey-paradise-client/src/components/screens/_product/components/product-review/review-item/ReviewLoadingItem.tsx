import { m } from "motion/react"

import { ProfileLoading } from "@/components/layouts/-header/components/right-part/ProfileLoading"
import { Skeleton } from "@/components/ui/common"

const ReviewLoadingItem = () => {
	return (
		<m.div
			initial={false}
			exit={{ opacity: 0, y: -5 }}
			className="h-64 w-full rounded-md bg-primary p-4"
		>
			<div className="mb-4 flex items-center justify-between">
				<div className="flex w-fit flex-row-reverse items-center">
					<ProfileLoading />
				</div>

				<Skeleton className="h-4 w-20" />
			</div>

			<div className="mb-4 flex items-center gap-3">
				<Skeleton className="h-9 w-24" />
				<Skeleton className="h-9 w-24" />
				<Skeleton className="h-9 w-24" />
			</div>

			<div className="flex flex-col gap-3">
				<Skeleton className="h-3 w-11/12" />
				<Skeleton className="h-3 w-5/6" />
				<Skeleton className="h-3 w-3/4" />
				<Skeleton className="h-3 w-3/4" />
			</div>
		</m.div>
	)
}

export { ReviewLoadingItem }
