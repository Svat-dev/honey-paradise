import { AnimatePresence, m } from "motion/react"
import type { FC } from "react"

import { cn } from "@/shared/lib/utils/base"

interface IProps {
	length: number
	maxLength: number | undefined
}

const TextareaCounter: FC<IProps> = ({ length, maxLength }) => {
	return (
		<div className="absolute bottom-2 right-2 flex items-center text-sm text-muted">
			<AnimatePresence mode="popLayout">
				<p
					key={"4321"}
					className={cn("transition-all will-change-auto", {
						"text-base text-black": maxLength === length
					})}
				>
					{length}
				</p>

				{maxLength && maxLength !== length && (
					<m.p key={"1234"} initial={false} exit={{ opacity: 0, x: 5 }}>
						/{maxLength}
					</m.p>
				)}
			</AnimatePresence>
		</div>
	)
}

export { TextareaCounter }
