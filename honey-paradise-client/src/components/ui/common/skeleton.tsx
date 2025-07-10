import { cn } from "@utils/base";
import type { HTMLAttributes } from "react";

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
	return <div className={cn("tw-animate-pulse tw-rounded-md tw-bg-muted/40", className)} {...props} />;
};

export { Skeleton };
