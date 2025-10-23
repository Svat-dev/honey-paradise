import type { Metadata, NextPage } from "next";

interface IProps {}

export async function generateMetadata(): Promise<Metadata> {
	return { title: "Cart" };
}

const CartPage: NextPage<IProps> = () => {
	return <div></div>;
};

export default CartPage;
