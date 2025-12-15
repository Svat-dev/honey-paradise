import type { Metadata, NextPage } from "next";

import { Cart } from "@/components/screens/_cart/Cart";
import { NO_INDEX_PAGE } from "@/shared/lib/constants/base";
import { getMetadata } from "@/shared/lib/utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {}

export async function generateMetadata(): Promise<Metadata> {
	const t = await getTranslations("global");

	return {
		...(await getMetadata({
			title: t("cart.title"),
			description: t("cart.description", { title: t("logo") }),
			index: false,
		})),
		...NO_INDEX_PAGE,
	};
}

const CartPage: NextPage<IProps> = () => {
	return <Cart />;
};

export default CartPage;
