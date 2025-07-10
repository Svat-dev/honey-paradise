import type { FC, HTMLAttributes, PropsWithChildren } from "react";

import { Title } from "@/components/ui/common";
import { cn } from "@utils/base";

interface ISettingsSection extends HTMLAttributes<HTMLDivElement> {
	title: string;
	description: string;
}

const SettingsSection: FC<PropsWithChildren<ISettingsSection>> = ({ title, description, children, ...props }) => {
	return (
		<div className={cn("tw-mt-4", props.className)} {...props}>
			<Title size="md" className="tw-font-semibold">
				{title}
			</Title>

			<p className="tw-text-muted tw-ml-1 tw-mb-3">{description}</p>

			{children}
		</div>
	);
};

export { SettingsSection };
