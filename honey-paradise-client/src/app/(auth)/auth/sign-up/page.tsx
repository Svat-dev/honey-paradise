import type { Metadata, NextPage } from "next";

import { NO_INDEX_PAGE } from "@constants/base";
import { SignUp } from "@/components/screens/_sign-up/SignUp";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	params: {};
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.sign-up");

	return {
		...(await getMetadata({
			title: t("title"),
			description: t("description", { title: t("title") }),
		})),
		...NO_INDEX_PAGE,
	};
}

const SignUpPage: NextPage<IProps> = () => {
	return <SignUp />;
};

export default SignUpPage;
