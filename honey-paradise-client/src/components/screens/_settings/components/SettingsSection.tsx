import { cn } from "@utils/base"
import type { FC, HTMLAttributes, PropsWithChildren } from "react"

import { Title } from "@/components/ui/common"

interface ISettingsSection extends HTMLAttributes<HTMLDivElement> {
	title: string
	description: string
}

const SettingsSection: FC<PropsWithChildren<ISettingsSection>> = ({
	title,
	description,
	children,
	...props
}) => {
	return (
		<div className={cn("mt-4", props.className)} {...props}>
			<Title size="md" className="font-semibold">
				{title}
			</Title>

			<p className="mb-3 ml-1 text-muted">{description}</p>

			{children}
		</div>
	)
}

export { SettingsSection }
