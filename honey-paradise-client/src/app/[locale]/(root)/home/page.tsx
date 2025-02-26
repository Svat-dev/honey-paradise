import { Index } from "@/components/screens/_index/Index";
import { APP_NAME_RU } from "@constants/base";
import { getMetadata } from "@utils/base";
import type { Metadata } from "next";

export const metadata: Metadata = {
	...getMetadata({
		title: "Главная",
		description: `Главная страница интернет-магазина ${APP_NAME_RU}`,
	}),
};

export default function IndexPage() {
	return <Index />;
}
