import { NO_INDEX_PAGE } from "@constants/base"
import { getMetadata } from "@utils/base"
import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { NotAuth } from "@/components/screens/_not-auth/NotAuth"

interface IProps {}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.notAuth")

	return {
		...(await getMetadata({
			title: t("title"),
			description: "",
			index: false
		})),
		...NO_INDEX_PAGE
	}
}

const NotAuthPage: NextPage<IProps> = props => {
	return <NotAuth />
}

export default NotAuthPage
