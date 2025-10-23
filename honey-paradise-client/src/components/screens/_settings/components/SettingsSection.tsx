import type { FC, HTMLAttributes, PropsWithChildren } from "react";

import { Title } from "@/components/ui/common";
import { cn } from "@utils/base";

interface ISettingsSection extends HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
}

const SettingsSection: FC<PropsWithChildren<ISettingsSection>> = ({ title, description, children, ...props }) => {
	return (
		<div className={cn("mt-4", props.className)} {...props}>
			<Title size="md" className="font-semibold">
				{title}
			</Title>

			<p className="text-muted ml-1 mb-3">{description}</p>

			{children}
		</div>
	);
};

export { SettingsSection };
