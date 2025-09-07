import type { Metadata, NextPage } from "next";

import { SignUp } from "@/components/screens/_sign-up/SignUp";
import type { TSearchParams } from "@/shared/types";
import { NO_INDEX_PAGE } from "@constants/base";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	searchParams: Promise<TSearchParams>;
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.sign-up");

	return {
		...(await getMetadata({
			title: t("title"),
			description: "",
			index: false,
		})),
		...NO_INDEX_PAGE,
	};
}

const SignUpPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams;

	return <SignUp searchParams={searchParams} />;
};

export default SignUpPage;
