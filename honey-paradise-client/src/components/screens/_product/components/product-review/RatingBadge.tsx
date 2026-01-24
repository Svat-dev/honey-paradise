import { m } from "motion/react"
import type { FC, PropsWithChildren } from "react"

import { cn } from "@/shared/lib/utils/base"
import type { ICNProps } from "@/shared/types"

interface IRatingBadge {
	name: string
	value: number
}

const RatingBadge: FC<IRatingBadge> = ({ name, value }) => {
	return (
		<m.div
			initial={{ opacity: 0, y: 5 }}
			animate={{ opacity: 1, y: 0 }}
			className="mb-2 ml-4 inline-block w-fit rounded-lg bg-primary px-4 py-2"
		>
			<span className="text-lg font-medium">{value}</span>
			<p className="whitespace-nowrap text-sm">{name}</p>
		</m.div>
	)
}

const ReviewRatingBadgeWrapper: FC<PropsWithChildren<ICNProps>> = ({
	children,
	className
}) => {
	return (
		<div className={cn("rounded-md bg-background p-1.5", className)}>
			{children}
		</div>
	)
}

export { RatingBadge, ReviewRatingBadgeWrapper }
