import type { Metadata, NextPage } from "next";

import { Index } from "@/components/screens/_index/Index";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global");

	return {
		...(await getMetadata({
			title: t("home.title"),
			description: t("home.description", { title: t("logo") }),
		})),
	};
}

const IndexPage: NextPage<IProps> = props => {
	return <Index />;
};

export default IndexPage;
