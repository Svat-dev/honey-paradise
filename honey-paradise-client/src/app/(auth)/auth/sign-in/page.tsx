import { NO_INDEX_PAGE } from "@constants/base"
import { getMetadata } from "@utils/base"
import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { SignIn } from "@/components/screens/_sign-in/SignIn"

interface IProps {}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.sign-in")

	return {
		...(await getMetadata({
			title: t("title"),
			description: "",
			index: false
		})),
		...NO_INDEX_PAGE
	}
}

const SignInPage: NextPage<IProps> = () => {
	return <SignIn />
}

export default SignInPage
