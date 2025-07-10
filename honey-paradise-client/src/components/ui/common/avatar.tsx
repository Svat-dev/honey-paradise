"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@utils/base";
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react";

const Avatar = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn("tw-relative tw-flex tw-h-10 tw-w-10 tw-shrink-0 tw-overflow-hidden tw-rounded-full", className)}
			{...props}
		/>
	)
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<ComponentRef<typeof AvatarPrimitive.Image>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Image ref={ref} className={cn("tw-aspect-square tw-h-full tw-w-full", className)} {...props} />
	)
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = forwardRef<ComponentRef<typeof AvatarPrimitive.Fallback>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn("tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center tw-rounded-full tw-bg-secondary", className)}
			{...props}
		/>
	)
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
