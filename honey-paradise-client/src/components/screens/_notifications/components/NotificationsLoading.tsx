import { Skeleton } from "@/components/ui/common";
import type { FC } from "react";

interface IProps {
	limit: number;
}

const NotificationsLoading: FC<IProps> = ({ limit }) => {
	return (
		<>
			{...Array(limit)
				.fill(0)
				.map((_, i) => <Skeleton key={i} className="tw-w-full tw-h-16 tw-rounded-md" />)}
			<div className="tw-w-full tw-h-16 tw-pointer-events-none" />
			<div className="tw-w-full tw-h-[3.25rem] tw-pointer-events-none" />
		</>
	);
};

export { NotificationsLoading };
