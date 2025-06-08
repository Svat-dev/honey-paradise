import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@utils/base";
import type { FC } from "react";

type TSeparator = SeparatorPrimitive.SeparatorProps;

const Separator: FC<TSeparator> = ({ className, orientation = "horizontal", decorative = true, ...props }) => (
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
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
