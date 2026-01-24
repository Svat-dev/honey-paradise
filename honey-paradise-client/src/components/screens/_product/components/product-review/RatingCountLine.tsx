import { m } from "motion/react"
import type { FC } from "react"

interface IRatingCountLine {
	data: [number, number]
	reviewsLength: number
}

const RatingCountLine: FC<IRatingCountLine> = ({
	data: [name, rating],
	reviewsLength
}) => {
	return (
		<li className="flex w-full items-center">
			<p className="font-medium">{name}</p>

			<div className="relative ml-2 w-full overflow-hidden rounded-lg">
				<div className="h-2 w-full bg-muted/20"></div>
				<m.div
					initial={{ width: 0 }}
					animate={{ width: `${((rating / reviewsLength) * 100).toFixed(2)}%` }}
					transition={{ type: "tween", delay: 1, duration: 0.4 }}
					className="absolute left-0 top-0 h-2 bg-primary"
				></m.div>
			</div>
		</li>
	)
}

export { RatingCountLine }
