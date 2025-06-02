import type { Metadata, NextPage } from "next";

import CookiesPolicy from "@/components/screens/_cookies-policy/CookiesPolicy.mdx";
import { Container } from "@/components/ui/layouts/container";
import { NO_INDEX_PAGE } from "@constants/base";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	params: {};
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.cookies-policy");

	return {
		...(await getMetadata({
			title: t("title"),
			description: t("description", { title: t("title") }),
			index: false,
		})),
		...NO_INDEX_PAGE,
	};
}

const CookiePolicyPage: NextPage<IProps> = async () => {
	const t = await getTranslations("global.cookies-policy.content");

	return (
		<Container className="tw-mb-4">
			<CookiesPolicy t={t} />
		</Container>
	);
};

export default CookiePolicyPage;
