import type { Metadata, NextPage } from "next";

import PrivacyPolicy from "@/components/screens/_privacy-policy/PrivacyPolicy.mdx";
import { Container } from "@/components/ui/layouts/container";
import { NO_INDEX_PAGE } from "@constants/base";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.privacy-policy");

	return {
		...(await getMetadata({
			title: t("title"),
			description: t("description", { title: t("title") }),
		})),
		...NO_INDEX_PAGE,
	};
}

const PrivacyPolicyPage: NextPage<IProps> = async () => {
	const t = await getTranslations("global.privacy-policy.content");

	return (
		<Container className="tw-mb-4">
			<PrivacyPolicy t={t} />
		</Container>
	);
};

export default PrivacyPolicyPage;
