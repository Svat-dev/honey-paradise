import type { Metadata, NextPage } from "next";

interface IProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
	const params = await props.params;

	return { title: `Category ${params.slug}` };
}

const CatalogCategoryPage: NextPage<IProps> = async props => {
	const params = await props.params;

	return <>Category slug: {params.slug}</>;
};

export default CatalogCategoryPage;
