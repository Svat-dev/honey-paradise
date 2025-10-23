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
			className={"relative w-full bg-primary rounded-lg p-3 mb-5"}
			initial={animate ? { opacity: 0.2, y: 10 } : false}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ type: "tween", delay: 0.1 }}
			viewport={{ once: true, amount: "some" }}
		>
			<Title size="sm" className="font-medium">
				{title}
				<a className="opacity-0 size-0" id={slugify(title, { locale: "en", lower: true })} />
			</Title>

			{description && <p className="font-normal text-muted -mt-0.5 ml-2">{description}</p>}

			{children}
		</m.section>
	);
};

export { ProfileSettingSection };
