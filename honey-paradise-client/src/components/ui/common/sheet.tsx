"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { cn } from "@utils/base";
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef, type HTMLAttributes } from "react";

import styles from "./styles/sheet.module.scss";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = forwardRef<ComponentRef<typeof SheetPrimitive.Overlay>, ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>>(
	({ className, ...props }, ref) => (
		<SheetPrimitive.Overlay
			className={cn(
				styles["sheet-overlay-ui"],
				"data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
				className
			)}
			{...props}
			ref={ref}
		/>
	)
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
	cn(
		styles["sheet-content-ui"],
		"data-[state=closed]:tw-duration-300 data-[state=open]:tw-duration-500 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out"
	),
	{
		variants: {
			side: {
				top: styles["sheet-content-ui-side-top"],
				bottom: styles["sheet-content-ui-side-bottom"],
				left: styles["sheet-content-ui-side-left"],
				right: styles["sheet-content-ui-side-right"],
			},
		},
		defaultVariants: {
			side: "right",
		},
	}
);

interface SheetContentProps extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<ComponentRef<typeof SheetPrimitive.Content>, SheetContentProps>(
	({ side = "right", className, children, ...props }, ref) => (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content ref={ref} className={cn("tw-bg-primary tw-border-none", sheetVariants({ side }), className)} {...props}>
				<SheetPrimitive.Close className={styles["sheet-close-btn-ui"]}>
					<XIcon size={24} />
					<span className="tw-sr-only">Закрыть</span>
				</SheetPrimitive.Close>
				{children}
			</SheetPrimitive.Content>
		</SheetPortal>
	)
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

const SheetHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => <div className={cn("tw-flex", className)} {...props} />;
SheetHeader.displayName = "SheetHeader";

const SheetFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn("tw-flex tw-flex-col", className)} {...props} />
);
SheetFooter.displayName = "SheetFooter";

const SheetTitle = forwardRef<ComponentRef<typeof SheetPrimitive.Title>, ComponentPropsWithoutRef<typeof SheetPrimitive.Title>>(
	({ className, ...props }, ref) => <SheetPrimitive.Title ref={ref} className={cn(styles["sheet-title-ui"], className)} {...props} />
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = forwardRef<
	ComponentRef<typeof SheetPrimitive.Description>,
	ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description ref={ref} className={cn("tw-text-sm tw-text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger };
