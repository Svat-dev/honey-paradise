"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";

import { type ComponentPropsWithoutRef, type ComponentRef, type HTMLAttributes, forwardRef } from "react";

import { cn } from "@utils/base";
import { XIcon } from "lucide-react";
import styles from "./styles/dialog.module.scss";

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<ComponentRef<typeof DialogPrimitive.Overlay>, ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>>(
	({ className, ...props }, ref) => (
		<DialogPrimitive.Overlay
			ref={ref}
			className={cn(
				styles["dialog-overlay-ui"],
				"data-[state=open]:tw-animate-in data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0",
				className
			)}
			{...props}
		/>
	)
);
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<ComponentRef<typeof DialogPrimitive.Content>, ComponentPropsWithoutRef<typeof DialogPrimitive.Content>>(
	({ className, children, ...props }, ref) => (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					styles["dialog-content-ui"],
					"data-[state=open]:tw-animate-in data-[state=open]:tw-fade-in-0 data-[state=open]:tw-zoom-in-95 data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%]",
					className
				)}
				{...props}
			>
				{children}
				<DialogPrimitive.Close className={styles["dialog-close-btn-ui"]}>
					<XIcon className="tw-h-4 tw-w-4" />
					<span className="tw-sr-only">Close</span>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPortal>
	)
);
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(styles["dialog-header-ui"], className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
	<div className={cn(styles["dialog-footer-ui"], className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<ComponentRef<typeof DialogPrimitive.Title>, ComponentPropsWithoutRef<typeof DialogPrimitive.Title>>(
	({ className, ...props }, ref) => <DialogPrimitive.Title ref={ref} className={cn(styles["dialog-title-ui"], className)} {...props} />
);
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
	ComponentRef<typeof DialogPrimitive.Description>,
	ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
	<DialogPrimitive.Description ref={ref} className={cn(styles["dialog-description-ui"], className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogOverlay,
	DialogPortal,
	DialogTitle,
	DialogTrigger,
};
