import { Separator } from "@/components/ui/common";
import { EnumStorageTokens } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import { cookies } from "next/dist/server/request/cookies";
import { memo, type FC } from "react";
import { LeftPart } from "./components/LeftPart";
import { MiddlePart } from "./components/MiddlePart";
import { RightPart } from "./components/right-part/RightPart";

interface IHeader {
	route?: EnumAppRoute;
}

const Header: FC<IHeader> = memo(async ({ route }) => {
	const isNeedSearchInput = route === EnumAppRoute.INDEX;
	const sessionCookie = (await cookies()).get(EnumStorageTokens.SESSION)?.value || false;

	return (
		<header className="tw-w-full tw-bg-primary tw-border-b tw-border-muted tw-h-15 tw-sticky tw-top-0 tw-z-50">
			<div className="tw-px-5 tw-h-full tw-flex tw-items-center tw-justify-between">
				<LeftPart />

				{isNeedSearchInput && (
					<>
						<Separator orientation="vertical" className="tw-mx-9 !tw-h-10" />

						<MiddlePart />

						<Separator orientation="vertical" className="tw-mx-9 !tw-h-10" />
					</>
				)}

				<RightPart isAuth={!!sessionCookie} />
			</div>
		</header>
	);
});

export { Header };
