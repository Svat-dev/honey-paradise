import type { FC, PropsWithChildren } from "react";

import { LeftPart } from "./components/LeftPart";

const Header: FC<PropsWithChildren> = ({ children }) => {
	return (
		<header className="tw-w-full tw-bg-primary tw-h-15">
			<div className="tw-px-5 tw-h-full tw-flex tw-items-center">
				<LeftPart />
			</div>
		</header>
	);
};

export { Header };
