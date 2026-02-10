"use client"

import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@utils/base"
import { LoaderIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { ComponentPropsWithoutRef, ComponentRef, forwardRef } from "react"

import styles from "./styles/switch.module.scss"

const Switch = forwardRef<
	ComponentRef<typeof SwitchPrimitives.Root>,
	ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
		isLoading?: boolean
	}
>(({ className, disabled, isLoading, title, ...props }, ref) => {
	const t = useTranslations("shared.ui.switch")
	const _title = props.checked
		? t("disable", { txt: title || "" })
		: t("enable", { txt: title || "" })

	return (
		<SwitchPrimitives.Root
			title={_title}
			className={cn(styles["switch-ui"], className)}
			disabled={disabled || isLoading}
			{...props}
			ref={ref}
		>
			<SwitchPrimitives.Thumb className={styles["switch-thumb-ui"]} />
			{isLoading && (
				<LoaderIcon size={20} className={styles["switch-loader-ui"]} />
			)}
		</SwitchPrimitives.Root>
	)
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
