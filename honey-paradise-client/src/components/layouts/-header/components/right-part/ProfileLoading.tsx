import { Skeleton } from "@/components/ui/common";

const ProfileLoading = () => {
	return (
		<>
			<div className="tw-flex tw-flex-col tw-gap-1">
				<Skeleton className="tw-w-24 tw-h-4" />
				<Skeleton className="tw-w-20 tw-h-3" />
			</div>

			<Skeleton className="tw-w-10 tw-h-10 tw-mr-4 !tw-rounded-full" />
		</>
	);
};

export { ProfileLoading };
