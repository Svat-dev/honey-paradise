"use client";

import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@utils/base";
import Image from "next/image";
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from "react";

const Avatar = forwardRef<ComponentRef<typeof AvatarPrimitive.Root>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Root
			ref={ref}
			className={cn("relative flex items-center justify-center h-10 w-10 rounded-full select-none touch-none", className)}
			{...props}
		/>
	)
);
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = forwardRef<ComponentRef<typeof AvatarPrimitive.Image>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Image ref={ref} className={cn("aspect-square h-[90%] w-[90%] rounded-full", className)} {...props} />
	)
);
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFrame: typeof Image = forwardRef(({ src, alt, width = 40, height = 40, className, ...props }, ref) => (
	<Image
		ref={ref}
		src={src}
		alt={alt}
		width={width}
		height={height}
		className={cn("absolute aspect-square w-full h-full", className)}
		aria-hidden
		{...props}
	/>
));
AvatarFrame.displayName = "AvatarFrame";

const AvatarFallback = forwardRef<ComponentRef<typeof AvatarPrimitive.Fallback>, ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>>(
	({ className, ...props }, ref) => (
		<AvatarPrimitive.Fallback
			ref={ref}
			className={cn("flex h-full w-full items-center justify-center rounded-full bg-secondary", className)}
			{...props}
		/>
	)
);
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarFrame, AvatarImage };
