import * as SeparatorPrimitive from "@radix-ui/react-separator";

import { cn } from "@utils/base";
import type { FC } from "react";
import styles from "./styles/separator.module.scss";

type TSeparator = SeparatorPrimitive.SeparatorProps;

const Separator: FC<TSeparator> = ({ className, orientation = "horizontal", decorative = true, ...props }) => (
	<SeparatorPrimitive.Root
		decorative={decorative}
		orientation={orientation}
		className={cn(
			styles["separator-ui"],
			orientation === "horizontal" ? styles["separator-ui-horizontal"] : styles["separator-ui-vertical"],
			className
		)}
		{...props}
	/>
);

Separator.displayName = SeparatorPrimitive.Root.displayName;

export { Separator };
