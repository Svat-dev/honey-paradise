import { MenuIcon } from "lucide-react"
import { useTranslations } from "next-intl"

import { MenuSheet } from "../sheet"

import { ProfileBlock } from "./ProfileBlock"

const AuthOnBlock = () => {
	const t = useTranslations("layout.header")

	return (
		<>
			<ProfileBlock t={t} />

			<MenuSheet>
				<button type="button" title={t("labels.menu")}>
					<MenuIcon height={28} width={30} />
				</button>
			</MenuSheet>
		</>
	)
}

export { AuthOnBlock }
