import { Skeleton } from "@/components/ui/common"

const ProfileLoading = () => {
	return (
		<>
			<div className="flex flex-col gap-1">
				<Skeleton className="h-4 w-24" />
				<Skeleton className="h-3 w-20" />
			</div>

			<Skeleton className="mr-4 h-10 w-10 !rounded-full" />
		</>
	)
}

export { ProfileLoading }
