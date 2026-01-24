import { EnumStorageKeys } from "@constants/base"
import { EnumAppRoute } from "@constants/routes"
import { cookies } from "next/dist/server/request/cookies"
import { type FC, memo } from "react"

import { Separator } from "@/components/ui/common"

import { LeftPart } from "./components/LeftPart"
import { RightPart } from "./components/right-part/RightPart"
import { MiddlePart } from "./components/search-input/MiddlePart"

interface IHeader {
	route?: EnumAppRoute
}

const Header: FC<IHeader> = memo(async ({ route }) => {
	const isNeedSearchInput = route === EnumAppRoute.INDEX
	const sessionCookie = (await cookies()).get(EnumStorageKeys.SESSION)?.value
		? true
		: false

	return (
		<header className="sticky top-0 z-20 h-15 w-full border-b border-muted bg-primary">
			<div className="flex h-full items-center justify-between px-5">
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
	)
})

export { Header }
