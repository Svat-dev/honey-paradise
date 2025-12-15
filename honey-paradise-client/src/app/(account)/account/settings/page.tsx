import type { Metadata, NextPage } from "next";

import { Settings } from "@/components/screens/_settings/Settings";
import { NO_INDEX_PAGE } from "@/shared/lib/constants/base";
import type { TSearchParams } from "@/shared/types";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	searchParams: Promise<TSearchParams>;
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global");

	return {
		...(await getMetadata({
			title: t("settings.title"),
			description: t("settings.description", { title: t("logo") }),
			index: false,
		})),
		...NO_INDEX_PAGE,
	};
}

const SettingsPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams;

	return <Settings searchParams={searchParams} />;
};

export default SettingsPage;
