import { ProfileLoading } from "@/components/layouts/-header/components/right-part/ProfileLoading";
import { Skeleton } from "@/components/ui/common";
import { m } from "motion/react";

const ReviewLoadingItem = () => {
	return (
		<m.div initial={false} exit={{ opacity: 0, y: -5 }} className="bg-primary p-4 rounded-md w-full h-64">
			<div className="flex items-center justify-between mb-4">
				<div className="flex flex-row-reverse items-center w-fit">
					<ProfileLoading />
				</div>

				<Skeleton className="w-20 h-4" />
			</div>

			<div className="flex items-center gap-3 mb-4">
				<Skeleton className="w-24 h-9" />
				<Skeleton className="w-24 h-9" />
				<Skeleton className="w-24 h-9" />
			</div>

			<div className="flex flex-col gap-3">
				<Skeleton className="w-11/12 h-3" />
				<Skeleton className="w-5/6 h-3" />
				<Skeleton className="w-3/4 h-3" />
				<Skeleton className="w-3/4 h-3" />
			</div>
		</m.div>
	);
};

export { ReviewLoadingItem };
