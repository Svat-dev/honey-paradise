"use client"

import { ChevronDownIcon, Loader2Icon } from "lucide-react"
import { AnimatePresence, m } from "motion/react"
import {
	Children,
	createContext,
	type FC,
	useContext,
	useEffect,
	useState
} from "react"

import { cn } from "@/shared/lib/utils/base"

import type {
	IAccordionContext,
	IAccordionHeaderProps,
	IAccordionItemProps,
	IAccordionPanelProps,
	IAccordionProps
} from "./types/accordion.type"

const AccordionContext = createContext<IAccordionContext>({
	index: 0,
	isActive: false,
	handleChangeIndex: () => {}
})
const useAccordion = () => useContext(AccordionContext)

const Accordion: FC<IAccordionProps> = ({
	children,
	multiple = false,
	activeIndex: activeIndexServer = -1,
	onChangeIndex
}) => {
	const [activeIndex, setActiveIndex] = useState<number | number[]>(
		multiple ? [activeIndexServer] : activeIndexServer
	)

	const changeIdx = (index: number, fn: (i: number | number[]) => void) => {
		if (!multiple || !Array.isArray(activeIndex)) {
			return fn(index === activeIndex ? -1 : index)
		}

		if (activeIndex.includes(index)) {
			return fn(activeIndex.filter(i => i !== index))
		}

		return fn(activeIndex.concat(index))
	}

	const handleChangeIndex = (index: number) => {
		if (typeof onChangeIndex !== "undefined") changeIdx(index, onChangeIndex)
		else changeIdx(index, setActiveIndex)
	}

	useEffect(() => {
		if (typeof activeIndexServer === "number")
			changeIdx(activeIndexServer, setActiveIndex)
	}, [activeIndexServer])

	return Children.map(children, (child, i) => {
		const isActive =
			multiple && Array.isArray(activeIndex)
				? activeIndex.includes(i)
				: activeIndex === i

		return (
			<AccordionContext.Provider
				value={{ isActive, index: i, handleChangeIndex }}
			>
				{child}
			</AccordionContext.Provider>
		)
	})
}

const AccordionItem: FC<IAccordionItemProps> = ({ children }) => {
	return (
		<div className="mb-5 overflow-hidden rounded-md bg-secondary">
			{children}
		</div>
	)
}
AccordionItem.displayName = "AccordionItem"

const AccordionHeader: FC<IAccordionHeaderProps> = ({
	children,
	className,
	isLoading
}) => {
	const { isActive, index, handleChangeIndex } = useAccordion()

	return (
		<m.div
			className={cn(
				"relative cursor-pointer select-none p-5 transition-all hover:bg-primary",
				className,
				{
					"bg-primary": isActive,
					"cursor-wait opacity-60": isLoading
				}
			)}
			onClick={() => handleChangeIndex(index)}
		>
			{children}

			{isLoading && (
				<Loader2Icon
					size={20}
					className="absolute right-2 top-2 animate-spin text-muted"
				/>
			)}

			<ChevronDownIcon
				size={30}
				className={cn(
					"absolute right-8 top-1/2 -translate-y-1/2 transition-transform will-change-auto",
					{
						"rotate-180": isActive
					}
				)}
			/>
		</m.div>
	)
}
AccordionHeader.displayName = "AccordionHeader"

const AccordionPanel: FC<IAccordionPanelProps> = ({
	children,
	className,
	items
}) => {
	const { isActive } = useAccordion()

	return (
		<AnimatePresence initial={false}>
			{isActive && (
				<m.div
					initial={{ height: 0 }}
					animate={{
						height: isActive
							? items?.length
								? items.height * items.length + (items.additional || 0)
								: "auto"
							: 0
					}}
					exit={{ height: 0 }}
					transition={{ type: "spring", duration: 0.4, bounce: 0 }}
				>
					<div className={cn("p-5", className)}>{children}</div>
				</m.div>
			)}
		</AnimatePresence>
	)
}
AccordionHeader.displayName = "AccordionPanel"

export { Accordion, AccordionHeader, AccordionItem, AccordionPanel }
