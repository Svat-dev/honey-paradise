"use client"

import * as SheetPrimitive from "@radix-ui/react-dialog"
import { cn } from "@utils/base"
import { cva, type VariantProps } from "class-variance-authority"
import { XIcon } from "lucide-react"
import {
	type ComponentPropsWithoutRef,
	type ComponentRef,
	forwardRef,
	type HTMLAttributes
} from "react"

import styles from "./styles/sheet.module.scss"

const Sheet = SheetPrimitive.Root

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

const SheetOverlay = forwardRef<
	ComponentRef<typeof SheetPrimitive.Overlay>,
	ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Overlay
		className={cn(
			styles["sheet-overlay-ui"],
			"data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
			className
		)}
		{...props}
		ref={ref}
	/>
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

const sheetVariants = cva(
	cn(
		styles["sheet-content-ui"],
		"data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out"
	),
	{
		variants: {
			side: {
				top: styles["sheet-content-ui-side-top"],
				bottom: styles["sheet-content-ui-side-bottom"],
				left: styles["sheet-content-ui-side-left"],
				right: styles["sheet-content-ui-side-right"]
			}
		},
		defaultVariants: {
			side: "right"
		}
	}
)

interface SheetContentProps
	extends
		ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
		VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<
	ComponentRef<typeof SheetPrimitive.Content>,
	SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => (
	<SheetPortal>
		<SheetOverlay />
		<SheetPrimitive.Content
			ref={ref}
			className={cn(
				"border-none bg-primary",
				sheetVariants({ side }),
				className
			)}
			{...props}
		>
			<SheetPrimitive.Close className={styles["sheet-close-btn-ui"]}>
				<XIcon size={24} />
				<span className="sr-only">Закрыть</span>
			</SheetPrimitive.Close>
			{children}
		</SheetPrimitive.Content>
	</SheetPortal>
))
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex", className)} {...props} />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
	className,
	...props
}: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("flex flex-col", className)} {...props} />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = forwardRef<
	ComponentRef<typeof SheetPrimitive.Title>,
	ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Title
		ref={ref}
		className={cn(styles["sheet-title-ui"], className)}
		{...props}
	/>
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = forwardRef<
	ComponentRef<typeof SheetPrimitive.Description>,
	ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description
		ref={ref}
		className={cn("text-muted-foreground text-sm", className)}
		{...props}
	/>
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetOverlay,
	SheetPortal,
	SheetTitle,
	SheetTrigger
}
