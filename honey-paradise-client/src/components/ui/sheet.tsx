"use client";

import * as SheetPrimitive from "@radix-ui/react-dialog";
import { cva, type VariantProps } from "class-variance-authority";
import { XIcon } from "lucide-react";

import { cn } from "@utils/base";
import { type ComponentPropsWithoutRef, type ElementRef, forwardRef, type HTMLAttributes } from "react";

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = forwardRef<ElementRef<typeof SheetPrimitive.Overlay>, ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>>(
	({ className, ...props }, ref) => (
		<SheetPrimitive.Overlay
			className={cn(
				"tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
				className
			)}
			{...props}
			ref={ref}
		/>
	)
);
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
	"tw-fixed tw-z-50 tw-gap-4 tw-bg-background tw-p-6 tw-shadow-lg tw-transition tw-ease-in-out data-[state=closed]:tw-duration-300 data-[state=open]:tw-duration-500 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out",
	{
		variants: {
			side: {
				top: "tw-inset-x-0 tw-top-0 tw-border-b data-[state=closed]:tw-slide-out-to-top data-[state=open]:tw-slide-in-from-top",
				bottom: "tw-inset-x-0 tw-bottom-0 tw-border-t data-[state=closed]:tw-slide-out-to-bottom data-[state=open]:tw-slide-in-from-bottom",
				left: "tw-inset-y-0 tw-left-0 tw-h-full tw-w-3/4 tw-border-r data-[state=closed]:tw-slide-out-to-left data-[state=open]:tw-slide-in-from-left sm:tw-max-w-sm",
				right:
					"tw-inset-y-0 tw-right-0 tw-h-full tw-w-3/4 tw-border-l data-[state=closed]:tw-slide-out-to-right data-[state=open]:tw-slide-in-from-right sm:tw-max-w-sm",
			},
		},
		defaultVariants: {
			side: "right",
		},
	}
);

interface SheetContentProps extends ComponentPropsWithoutRef<typeof SheetPrimitive.Content>, VariantProps<typeof sheetVariants> {}

const SheetContent = forwardRef<ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
	({ side = "right", className, children, ...props }, ref) => (
		<SheetPortal>
			<SheetOverlay />
			<SheetPrimitive.Content ref={ref} className={cn("tw-bg-primary tw-border-none", sheetVariants({ side }), className)} {...props}>
				<SheetPrimitive.Close className="tw-absolute tw-right-4 tw-top-4 tw-bg-none tw-text-muted tw-transition-all hover:tw-text-black hover:tw-rotate-180 data-[state=open]:tw-bg-secondary">
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

const SheetTitle = forwardRef<ElementRef<typeof SheetPrimitive.Title>, ComponentPropsWithoutRef<typeof SheetPrimitive.Title>>(
	({ className, ...props }, ref) => (
		<SheetPrimitive.Title ref={ref} className={cn("tw-text-lg tw-font-semibold tw-text-foreground", className)} {...props} />
	)
);
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = forwardRef<
	ElementRef<typeof SheetPrimitive.Description>,
	ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
	<SheetPrimitive.Description ref={ref} className={cn("tw-text-sm tw-text-muted-foreground", className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger };
