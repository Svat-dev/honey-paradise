import type { Metadata, NextPage } from "next";

import CookiesPolicy from "@/components/screens/_cookies-policy/CookiesPolicy.mdx";
import { Container } from "@/components/ui/layouts/container";
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
		})),
	};
}

const CookiePolicyPage: NextPage = () => {
	return (
		<Container className="tw-mb-4">
			<CookiesPolicy />
		</Container>
	);
};

export default CookiePolicyPage;
