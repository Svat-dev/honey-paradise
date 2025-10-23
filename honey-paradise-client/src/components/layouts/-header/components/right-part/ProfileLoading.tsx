import { Skeleton } from "@/components/ui/common";

const ProfileLoading = () => {
	return (
		<>
			<div className="flex flex-col gap-1">
				<Skeleton className="w-24 h-4" />
				<Skeleton className="w-20 h-3" />
			</div>

			<Skeleton className="w-10 h-10 mr-4 !rounded-full" />
		</>
	);
};

export { ProfileLoading };
