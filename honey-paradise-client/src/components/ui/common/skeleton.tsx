import { cn } from "@utils/base"
import { type HTMLMotionProps, m } from "motion/react"
import type { FC, HTMLAttributes } from "react"

const Skeleton: FC<HTMLAttributes<HTMLDivElement>> = ({
	className,
	...props
}) => {
	return (
		<div
			className={cn("animate-pulse rounded-md bg-muted/40", className)}
			{...props}
		/>
	)
}

const MotionSkeleton: FC<HTMLMotionProps<"div">> = ({
	className,
	...props
}) => {
	return (
		<m.div
			className={cn("animate-pulse rounded-md bg-muted/40", className)}
			{...props}
		/>
	)
}

export { MotionSkeleton, Skeleton }
