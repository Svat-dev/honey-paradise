import type { Metadata, NextPage } from "next";

import { CatalogCategory } from "@/components/screens/_catalog/CatalogCategory";

interface IProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
	const params = await props.params;

	return { title: `Category ${params.slug}` };
}

const CatalogCategoryPage: NextPage<IProps> = async props => {
	const params = await props.params;

	return <CatalogCategory slug={params.slug} />;
};

export default CatalogCategoryPage;
