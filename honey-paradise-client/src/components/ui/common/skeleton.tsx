import { cn } from "@utils/base";
import type { HTMLAttributes } from "react";

const Skeleton = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
	return <div className={cn("animate-pulse rounded-md bg-muted/40", className)} {...props} />;
};

export { Skeleton };
