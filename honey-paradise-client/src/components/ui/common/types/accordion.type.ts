import type { PropsWithChildren } from "react"

import type { ICNProps } from "@/shared/types"

export interface IAccordionProps extends PropsWithChildren {
	multiple?: boolean
	activeIndex?: number
	onChangeIndex?: (index: number | number[]) => void
}

export interface IAccordionItemProps extends PropsWithChildren {}

export interface IAccordionHeaderProps extends PropsWithChildren, ICNProps {
	isLoading?: boolean
}

export interface IAccordionPanelProps extends PropsWithChildren, ICNProps {
	items?: {
		length: number
		height: number
		additional: number
	}
}

export interface IAccordionContext {
	isActive: boolean
	index: number
	handleChangeIndex: (i: number) => void
}
