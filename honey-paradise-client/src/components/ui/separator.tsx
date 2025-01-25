import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@utils/base";
import { type ComponentPropsWithoutRef, forwardRef } from "react";

const Separator = forwardRef<typeof SeparatorPrimitive.Root, ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>>(
	({ className, orientation = "horizontal", decorative = true, ...props }) => (
		<SeparatorPrimitive.Root
			decorative={decorative}
			orientation={orientation}
			className={cn(
				"tw-shrink-0 tw-bg-black tw-bg-opacity-40",
				orientation === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
				className
			)}
			{...props}
		/>
	)
);
Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
