import type { Metadata, NextPage } from "next";

import { Orders } from "@/components/screens/_orders/Orders";

interface IProps {}

export async function generateMetadata(): Promise<Metadata> {
	return { title: "User Orders" };
}

const OrdersPage: NextPage<IProps> = () => {
	return <Orders />;
};

export default OrdersPage;
