import type { PropsWithChildren } from "react"

import type { ICNProps } from "@/shared/types"

export interface IAccordionProps extends PropsWithChildren {
	multiple?: boolean
	activeIndex?: number
	onChangeIndex?: (index: number | number[]) => void
}

export interface IAccordionItemProps extends PropsWithChildren {}

export interface IAccordionHeaderProps extends PropsWithChildren, ICNProps {}

export interface IAccordionPanelProps extends PropsWithChildren {}

export interface IAccordionContext {
	isActive: boolean
	index: number
	handleChangeIndex: (i: number) => void
}
