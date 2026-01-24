import { redirect, RedirectType } from "next/dist/client/components/navigation"
import type { FC } from "react"

import { EnumAppRoute } from "@/shared/lib/constants/routes"
import type { TSearchParams } from "@/shared/types"

import { ChangePassword } from "./components/ChangePassword"
import { ResetPassword } from "./components/ResetPassword"
import { EnumPasswordRecoverTabs } from "./types/type"

interface IPasswordRecovery {
	searchParams: TSearchParams
}

const PasswordRecovery: FC<IPasswordRecovery> = ({ searchParams }) => {
	const type = searchParams.type as EnumPasswordRecoverTabs
	const token = (searchParams.token as string) || ""

	if (
		type !== EnumPasswordRecoverTabs.CHANGE &&
		type !== EnumPasswordRecoverTabs.RESET
	)
		return redirect(EnumAppRoute.NOT_FOUND, RedirectType.replace)

	return (
		<>
			{type === EnumPasswordRecoverTabs.CHANGE ? (
				<ChangePassword token={token} />
			) : type === EnumPasswordRecoverTabs.RESET ? (
				<ResetPassword />
			) : undefined}
		</>
	)
}

export { PasswordRecovery }
