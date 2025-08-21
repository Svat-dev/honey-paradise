import type { FC, HTMLAttributes, PropsWithChildren } from "react";

import { Title } from "@/components/ui/common";
import { cn } from "@utils/base";
import slugify from "slugify";

interface IProfileSettingSection extends HTMLAttributes<HTMLDivElement> {
	title: string;
	description?: string;
}

const ProfileSettingSection: FC<PropsWithChildren<IProfileSettingSection>> = ({ title, description, children, ...props }) => {
	return (
		<section className={cn("tw-relative tw-w-full tw-bg-primary tw-rounded-lg tw-p-3 tw-mb-5", props.className)} {...props}>
			<Title size="sm" className="tw-font-medium">
				{title}
				<a className="tw-opacity-0 tw-size-0" id={slugify(title, { locale: "en", lower: true })} />
			</Title>

			{description && <p className="tw-font-normal tw-text-muted -tw-mt-0.5 tw-ml-2">{description}</p>}

			{children}
		</section>
	);
};

export { ProfileSettingSection };
