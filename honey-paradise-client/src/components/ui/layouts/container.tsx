import { cn } from "@utils/base"
import type { FC, PropsWithChildren } from "react"

import type { ICNProps } from "@/shared/types/base.type"

const Container: FC<PropsWithChildren<ICNProps>> = ({
	children,
	className
}) => {
	return (
		<div
			className={cn("max-w-screen-3xl mx-auto print:max-w-full", className)}
			aria-hidden
		>
			{children}
		</div>
	)
}

export { Container }
