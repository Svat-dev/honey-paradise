import type { FC, PropsWithChildren } from "react";

import { Title } from "@/components/ui/common";
import { m } from "motion/react";
import slugify from "slugify";

interface IProfileSettingSection {
	title: string;
	description?: string;
	animate?: boolean;
}

const ProfileSettingSection: FC<PropsWithChildren<IProfileSettingSection>> = ({ title, description, animate, children }) => {
	return (
		<m.section
			className={"tw-relative tw-w-full tw-bg-primary tw-rounded-lg tw-p-3 tw-mb-5"}
			initial={animate ? { opacity: 0.2, y: 10 } : false}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ type: "tween", delay: 0.1 }}
			viewport={{ once: true, amount: "some" }}
		>
			<Title size="sm" className="tw-font-medium">
				{title}
				<a className="tw-opacity-0 tw-size-0" id={slugify(title, { locale: "en", lower: true })} />
			</Title>

			{description && <p className="tw-font-normal tw-text-muted -tw-mt-0.5 tw-ml-2">{description}</p>}

			{children}
		</m.section>
	);
};

export { ProfileSettingSection };
