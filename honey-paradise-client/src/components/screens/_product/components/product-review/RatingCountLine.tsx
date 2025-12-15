import { m } from "motion/react";
import type { FC } from "react";

interface IRatingCountLine {
	data: [number, number];
	reviewsLength: number;
}

const RatingCountLine: FC<IRatingCountLine> = ({ data: [name, rating], reviewsLength }) => {
	return (
		<li className="flex items-center w-full">
			<p className="font-medium">{name}</p>

			<div className="relative w-full ml-2 rounded-lg overflow-hidden">
				<div className="h-2 w-full bg-muted/20"></div>
				<m.div
					initial={{ width: 0 }}
					animate={{ width: `${((rating / reviewsLength) * 100).toFixed(2)}%` }}
					transition={{ type: "tween", delay: 1, duration: 0.4 }}
					className="absolute top-0 left-0 h-2 bg-primary"
				></m.div>
			</div>
		</li>
	);
};

export { RatingCountLine };
