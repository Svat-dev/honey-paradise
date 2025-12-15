import type { FC, PropsWithChildren } from "react";

import type { ICNProps } from "@/shared/types";
import { cn } from "@/shared/lib/utils/base";
import { m } from "motion/react";

interface IRatingBadge {
	name: string;
	value: number;
}

const RatingBadge: FC<IRatingBadge> = ({ name, value }) => {
	return (
		<m.div
			initial={{ opacity: 0, y: 5 }}
			animate={{ opacity: 1, y: 0 }}
			className="inline-block w-fit px-4 py-2 bg-primary rounded-lg ml-4 mb-2"
		>
			<span className="text-lg font-medium">{value}</span>
			<p className="text-sm whitespace-nowrap">{name}</p>
		</m.div>
	);
};

const ReviewRatingBadgeWrapper: FC<PropsWithChildren<ICNProps>> = ({ children, className }) => {
	return <div className={cn("p-1.5 bg-background rounded-md", className)}>{children}</div>;
};

export { RatingBadge, ReviewRatingBadgeWrapper };
