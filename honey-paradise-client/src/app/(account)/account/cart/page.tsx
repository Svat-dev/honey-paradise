import type { Metadata, NextPage } from "next";

import { Cart } from "@/components/screens/_cart/Cart";

interface IProps {}

export async function generateMetadata(): Promise<Metadata> {
	return { title: "User cart" };
}

const CartPage: NextPage<IProps> = () => {
	return <Cart />;
};

export default CartPage;
