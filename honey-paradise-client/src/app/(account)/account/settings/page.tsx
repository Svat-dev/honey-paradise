import type { Metadata, NextPage } from "next";

import { Settings } from "@/components/screens/_settings/Settings";
import type { TSearchParams } from "@/shared/types";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	searchParams: Promise<TSearchParams>;
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.settings");

	return {
		...(await getMetadata({
			title: t("title"),
			description: t("description", { title: t("title") }),
		})),
	};
}

const SettingsPage: NextPage<IProps> = props => {
	return <Settings />;
};

export default SettingsPage;
