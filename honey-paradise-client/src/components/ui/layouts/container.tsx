import type { FC, PropsWithChildren } from "react";

import type { ICNProps } from "@/shared/types/base.type";
import { cn } from "@utils/base";

const Container: FC<PropsWithChildren<ICNProps>> = ({ children, className }) => {
	return <div className={cn("tw-mx-auto tw-max-w-screen-2xl", className)}>{children}</div>;
};

export { Container };
