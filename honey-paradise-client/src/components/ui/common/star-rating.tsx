"use client";

import { cn } from "@/shared/lib/utils/base";
import { StarIcon } from "lucide-react";
import { m } from "motion/react";
import { useState, type FC } from "react";
import type { IStartRatingProps } from "./types/star-rating.type";

const StarRating: FC<IStartRatingProps> = ({
	animate = true,
	starCount = 5,
	defaultRating = 0,
	rating: _rating = defaultRating,
	readOnly = false,
	size = 32,
	color,
	bgColor,
	onChangeRating,
	className,
}) => {
	const [rating, setRating] = useState<number>(defaultRating);

	const handleChange = (value: number) => {
		if (readOnly) return;

		if (typeof onChangeRating !== "undefined") onChangeRating(value);
		else setRating(value);
	};

	return (
		<div className={cn("inline-block touch-none", className)}>
			<div className="relative inline-block whitespace-nowrap select-none touch-none align-middle overflow-hidden">
				<div className="inline-block" style={{ color: bgColor ? bgColor : "#ccc" }}>
					{Array(starCount)
						.fill(0)
						.map((_, i) => (
							<StarIcon
								key={i}
								className={cn("inline-block", { "cursor-pointer": !readOnly })}
								stroke="currentColor"
								fill="currentColor"
								strokeWidth={0}
								size={size}
								onClick={() => handleChange(i + 1)}
							/>
						))}
				</div>

				<m.div
					initial={animate ? { width: 0 } : false}
					animate={{ width: `${Math.floor(((typeof _rating !== "undefined" ? _rating : rating) / starCount) * 100)}%` }}
					transition={{ type: "tween", delay: readOnly ? 1 : 0, duration: 0.4 }}
					className="absolute inline-block top-0 left-0 pointer-events-none select-none touch-none whitespace-nowrap overflow-hidden"
					style={{ color: color ? color : "#facc15" }}
				>
					{Array(starCount)
						.fill(0)
						.map((_, i) => (
							<StarIcon key={i} className="inline-block" stroke="currentColor" fill="currentColor" strokeWidth={0} size={size} />
						))}
				</m.div>
			</div>
		</div>
	);
};

export { StarRating };
