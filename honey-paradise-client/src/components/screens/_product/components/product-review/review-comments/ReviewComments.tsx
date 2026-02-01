import { m } from "motion/react"

import { CreateComment } from "./CreateComment"

const ReviewComments = () => {
	return (
		<m.section
			initial={{ height: 0, opacity: 0.7 }}
			animate={{ height: "100%", opacity: 1 }}
			transition={{ type: "tween", duration: 1 }}
			className="overflow-hidden"
		>
			<CreateComment />

			<div>Other comments</div>
		</m.section>
	)
}

export { ReviewComments }
