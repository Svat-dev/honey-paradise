import type { Metadata, NextPage } from "next";

import { SignIn } from "@/components/screens/_sign-in/SignIn";
import { NO_INDEX_PAGE } from "@constants/base";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.sign-in");

	return {
		...(await getMetadata({
			title: t("title"),
			description: t("description", { title: t("title") }),
		})),
		...NO_INDEX_PAGE,
	};
}

const SignInPage: NextPage<IProps> = () => {
	return <SignIn />;
};

export default SignInPage;
