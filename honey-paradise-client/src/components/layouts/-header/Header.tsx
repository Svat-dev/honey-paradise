import { Separator } from "@/components/ui";
import { EnumAppRoute } from "@/shared/lib/constants/routes";
import type { FC } from "react";
import { LeftPart } from "./components/LeftPart";
import { MiddlePart } from "./components/MiddlePart";
import { RightPart } from "./components/right-part/RightPart";

interface IHeader {
	route?: EnumAppRoute;
}

const Header: FC<IHeader> = ({ route }) => {
	const isNeedSearchInput = route === EnumAppRoute.INDEX;

	return (
		<header className="tw-w-full tw-bg-primary tw-h-15 tw-sticky">
			<div className="tw-px-5 tw-h-full tw-flex tw-items-center tw-justify-between">
				<LeftPart />

				{isNeedSearchInput && (
					<>
						<Separator orientation="vertical" className="tw-mx-9 !tw-h-10" />

						<MiddlePart />

						<Separator orientation="vertical" className="tw-mx-9 !tw-h-10" />
					</>
				)}

				<RightPart />
			</div>
		</header>
	);
};

export { Header };
