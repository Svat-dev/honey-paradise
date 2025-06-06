import type { FC, PropsWithChildren } from "react";

import { Title } from "@/components/ui";
import { cn } from "@utils/base";

interface IProps extends PropsWithChildren {
	title: string;
	className?: string;
}

const OptionalPartSection: FC<IProps> = ({ className, title, children }) => {
	return (
		<div className={cn("tw-mb-5 tw-px-6", className)}>
			<Title size="md" className="tw-text-[20px]">
				{title}
			</Title>
			{children}
		</div>
	);
};

export { OptionalPartSection };
