import type { Metadata, NextPage } from "next";

import CookiesPolicy from "@/components/screens/_cookies-policy/CookiesPolicy.mdx";
import { Container } from "@/components/ui/layouts/container";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global");

	return {
		...(await getMetadata({
			title: t("cookies-policy.title"),
			description: t("cookies-policy.description", { title: t("logo") }),
		})),
	};
}

const CookiePolicyPage: NextPage<IProps> = async () => {
	const t = await getTranslations("global.cookies-policy.content");

	return (
		<Container className="mb-4">
			<CookiesPolicy t={t} />
		</Container>
	);
};

export default CookiePolicyPage;
