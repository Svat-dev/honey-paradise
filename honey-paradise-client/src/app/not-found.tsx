import { getMetadata, getViewport } from "@utils/base";
import type { Metadata, NextPage, Viewport } from "next";

import { Header } from "@/components/layouts/-header/Header";
import { NotFound } from "@/components/screens/_not-found/NotFound";
import { NO_INDEX_PAGE } from "@constants/base";
import { getTranslations } from "next-intl/server";

interface IProps {}

export const viewport: Viewport = getViewport(false, 1);

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.notFound");

	return {
		...(await getMetadata({
			title: t("title"),
			description: "",
			index: false,
		})),
		...NO_INDEX_PAGE,
	};
}

const NotFoundPage: NextPage<IProps> = props => {
	return (
		<>
			<Header />
			<NotFound />
		</>
	);
};

export default NotFoundPage;
