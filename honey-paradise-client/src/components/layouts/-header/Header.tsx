import { Separator } from "@/components/ui";
import type { FC } from "react";
import { LeftPart } from "./components/LeftPart";
import { MiddlePart } from "./components/MiddlePart";
import { RightPart } from "./components/RightPart";

interface IHeader {}

const Header: FC<IHeader> = ({}) => {
	return (
		<header className="tw-w-full tw-bg-primary tw-h-15">
			<div className="tw-px-5 tw-h-full tw-flex tw-items-center">
				<LeftPart />

				<Separator orientation="vertical" className="tw-mx-9 !tw-h-10" />

				<MiddlePart />

				<Separator orientation="vertical" className="tw-mx-9 !tw-h-10" />

				<RightPart />
			</div>
		</header>
	);
};

export { Header };
