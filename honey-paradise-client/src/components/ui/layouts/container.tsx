import type { FC, PropsWithChildren } from "react"

import type { ICNProps } from "@/shared/types/base.type"
import { cn } from "@utils/base"

const Container: FC<PropsWithChildren<ICNProps>> = ({ children, className }) => {
	return (
		<div className={cn("mx-auto max-w-screen-2xl print:max-w-full", className)} aria-hidden>
			{children}
		</div>
	)
}

export { Container }
