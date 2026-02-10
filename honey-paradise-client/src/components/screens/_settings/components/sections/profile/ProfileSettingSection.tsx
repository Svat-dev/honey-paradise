import { m } from "motion/react"
import type { FC, PropsWithChildren } from "react"
import slugify from "slugify"

import { Title } from "@/components/ui/common"

interface IProfileSettingSection {
	title: string
	description?: string
	animate?: boolean
}

const ProfileSettingSection: FC<PropsWithChildren<IProfileSettingSection>> = ({
	title,
	description,
	animate,
	children
}) => {
	return (
		<m.section
			className={"relative mb-5 w-full rounded-lg bg-primary p-3"}
			initial={animate ? { opacity: 0.2, y: 10 } : false}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ type: "tween", delay: 0.1 }}
			viewport={{ once: true, amount: "some" }}
		>
			<Title size="sm" className="font-medium">
				{title}
				<a
					className="size-0 opacity-0"
					id={slugify(title, { locale: "en", lower: true })}
				/>
			</Title>

			{description && (
				<p className="-mt-0.5 ml-2 font-normal text-muted">{description}</p>
			)}

			{children}
		</m.section>
	)
}

export { ProfileSettingSection }
