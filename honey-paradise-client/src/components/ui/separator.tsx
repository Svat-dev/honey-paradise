import * as SeparatorPrimitive from "@radix-ui/react-separator";

import type { FC } from "react";
import { cn } from "@utils/base";
import styles from "./styles/separator.module.scss";

type TSeparator = SeparatorPrimitive.SeparatorProps;

const Separator: FC<TSeparator> = ({ className, orientation = "horizontal", decorative = true, ...props }) => (
	<SeparatorPrimitive.Root
		decorative={decorative}
		orientation={orientation}
		className={cn(styles["separator-ui"], orientation === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]", className)}
		{...props}
	/>
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
