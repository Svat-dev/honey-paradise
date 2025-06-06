"use client";

import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";

import { cn } from "@utils/base";
import { Circle } from "lucide-react";

const RadioGroup = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
	return <RadioGroupPrimitive.Root className={cn("tw-grid tw-gap-2", className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
	React.ElementRef<typeof RadioGroupPrimitive.Item>,
	React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
	return (
		<RadioGroupPrimitive.Item
			ref={ref}
			className={cn(
				"tw-relative tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-black tw-bg-secondary tw-shadow focus:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-ring disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
				className
			)}
			{...props}
		>
			<RadioGroupPrimitive.Indicator className="tw-absolute tw-top-1/2 tw-left-1/2 -tw-translate-y-1/2 -tw-translate-x-1/2 tw-opacity-0 tw-animate-show-effect tw-duration-200">
				<Circle className="tw-h-3 tw-w-3 tw-fill-black" />
			</RadioGroupPrimitive.Indicator>
		</RadioGroupPrimitive.Item>
	);
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
