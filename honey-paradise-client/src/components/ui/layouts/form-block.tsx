import type { FC, PropsWithChildren } from "react";

import { Title } from "@/components/ui/common";

interface IProps extends PropsWithChildren {
	title: string;
	active: boolean;
	containerClassName?: string;
	titleClassName?: string;
}

const FormBlock: FC<IProps> = ({ title, children, titleClassName, containerClassName, active }) => {
	return (
		<section className={containerClassName} data-status={active}>
			<Title size="lg" className={titleClassName}>
				{title}
			</Title>

			{children}
		</section>
	);
};

export { FormBlock };
