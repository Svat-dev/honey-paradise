import { Title } from "@/components/ui/common";
import type { FC } from "react";

interface IProduct {
	slug: string;
}

const Product: FC<IProduct> = ({ slug }) => {
	return (
		<article>
			<Title size="lg">Product {slug}</Title>
		</article>
	);
};

export { Product };
