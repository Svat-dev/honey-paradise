import type { FC } from "react";
import { LeftPart } from "./components/LeftPart";
import { Separator } from "@/components/ui";

interface IHeader {}

const Header: FC<IHeader> = ({}) => {
	return (
		<header className="tw-w-full tw-bg-primary tw-h-15">
			<div className="tw-px-5 tw-h-full tw-flex tw-items-center">
				<LeftPart />

				<Separator orientation="vertical" className="tw-ml-9 tw-h-11" />
			</div>
		</header>
	);
};

export { Header };
