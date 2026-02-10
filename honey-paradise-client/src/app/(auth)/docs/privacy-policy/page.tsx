import { getMetadata } from "@utils/base"
import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import PrivacyPolicy from "@/components/screens/_privacy-policy/PrivacyPolicy.mdx"
import { Container } from "@/components/ui/layouts/container"

interface IProps {}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global")

	return {
		...(await getMetadata({
			title: t("privacy-policy.title"),
			description: t("privacy-policy.description", { title: t("logo") })
		}))
	}
}

const PrivacyPolicyPage: NextPage<IProps> = async () => {
	const t = await getTranslations("global.privacy-policy.content")

	return (
		<Container className="mb-4">
			<PrivacyPolicy t={t} />
		</Container>
	)
}

export default PrivacyPolicyPage
