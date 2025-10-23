import type { Metadata, NextPage } from "next";

import { Catalog } from "@/components/screens/_catalog/Catalog";
import type { TSearchParams } from "@/shared/types";
import { getTranslations } from "next-intl/server";

interface IProps {
	searchParams: Promise<TSearchParams>;
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
	const t = await getTranslations("global");
	const searchParams = await props.searchParams;

	return {
		title: `Results to ${searchParams.q}`,
	};
}

const CatalogPage: NextPage<IProps> = async props => {
	const searchParams = await props.searchParams;

	return <Catalog q={searchParams.q} />;
};

export default CatalogPage;
