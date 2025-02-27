import { Index } from "@/components/screens/_index/Index";
import { getMetadata } from "@utils/base";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

interface IProps {
	params: {};
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global");

	return {
		...(await getMetadata({
			title: t("home.title"),
			description: t("home.description", { title: t("home.title") }),
		})),
	};
}

export default async function IndexPage({}: IProps) {
	return <Index />;
}
