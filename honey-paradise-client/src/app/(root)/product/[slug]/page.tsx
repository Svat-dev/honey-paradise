import type { Metadata, NextPage } from "next";

import { Product } from "@/components/screens/_product/Product";

interface IProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata(props: IProps): Promise<Metadata> {
	const params = await props.params;

	return { title: `Product ${params.slug}` };
}

const ProductPage: NextPage<IProps> = async props => {
	const params = await props.params;

	return <Product slug={params.slug} />;
};

export default ProductPage;
