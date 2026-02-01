import type { PropsWithChildren } from "react"

export interface IAccordionProps extends PropsWithChildren {
	multiple?: boolean
	activeIndex?: number
	onChangeIndex?: (index: number | number[]) => void
}

export interface IAccordionItemProps extends PropsWithChildren {}

export interface IAccordionHeaderProps extends PropsWithChildren {}

export interface IAccordionPanelProps extends PropsWithChildren {}

export interface IAccordionContext {
	isActive: boolean
	index: number
	handleChangeIndex: (i: number) => void
}
