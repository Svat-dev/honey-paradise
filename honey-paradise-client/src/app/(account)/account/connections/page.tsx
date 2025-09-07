import type { Metadata, NextPage } from "next";

import { Connections } from "@/components/screens/_connections/Connections";
import type { TSearchParams } from "@/shared/types";
import { NO_INDEX_PAGE } from "@constants/base";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	searchParams: Promise<TSearchParams>;
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.connections");

	return {
		...(await getMetadata({
			title: t("title"),
			description: "",
			index: false,
		})),
		...NO_INDEX_PAGE,
	};
}

const ConnectionsPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams;

	return <Connections searchParams={searchParams} />;
};

export default ConnectionsPage;
