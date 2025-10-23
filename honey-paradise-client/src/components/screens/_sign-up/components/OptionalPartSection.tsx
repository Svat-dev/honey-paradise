import type { FC, PropsWithChildren } from "react";

import { Title } from "@/components/ui/common";
import { cn } from "@utils/base";

interface IProps extends PropsWithChildren {
	title: string;
	className?: string;
}

const OptionalPartSection: FC<IProps> = ({ className, title, children }) => {
	return (
		<div className={cn("mb-5 px-6", className)}>
			<Title size="md" className="text-[20px]">
				{title}
			</Title>
			{children}
		</div>
	);
};

export { OptionalPartSection };
