import { Separator } from "@/components/ui/common";
import { EnumStorageKeys } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import { cookies } from "next/dist/server/request/cookies";
import { memo, type FC } from "react";
import { LeftPart } from "./components/LeftPart";
import { RightPart } from "./components/right-part/RightPart";
import { MiddlePart } from "./components/search-input/MiddlePart";

interface IHeader {
	route?: EnumAppRoute;
}

const Header: FC<IHeader> = memo(async ({ route }) => {
	const isNeedSearchInput = route === EnumAppRoute.INDEX;
	const sessionCookie = (await cookies()).get(EnumStorageKeys.SESSION)?.value ? true : false;

	return (
		<header className="w-full bg-primary border-b border-muted h-15 sticky top-0 z-20">
			<div className="px-5 h-full flex items-center justify-between">
				<LeftPart />

				{isNeedSearchInput && (
					<>
						<Separator orientation="vertical" className="mx-9 !h-10" />

						<MiddlePart />

						<Separator orientation="vertical" className="mx-9 !h-10" />
					</>
				)}

				<RightPart isAuth={sessionCookie} />
			</div>
		</header>
	);
});

export { Header };
