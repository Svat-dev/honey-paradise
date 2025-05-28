import { MenuIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ProfileBlock } from "../ProfileBlock";
import { MenuSheet } from "../sheet";

const AuthOnBlock = async () => {
	const t = await getTranslations("layout.header");

	return (
		<>
			<ProfileBlock t={t} />

			<MenuSheet>
				<button type="button" title={t("labels.menu")} className="tw-ml-5">
					<MenuIcon height={28} width={30} />
				</button>
			</MenuSheet>
		</>
	);
};

export { AuthOnBlock };
