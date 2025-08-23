import type { Metadata, NextPage } from "next";

import { Notifications } from "@/components/screens/_notifications/Notifications";
import type { TSearchParams } from "@/shared/types";
import { NO_INDEX_PAGE } from "@constants/base";
import { getMetadata } from "@utils/base";
import { getTranslations } from "next-intl/server";

interface IProps {
	searchParams: Promise<TSearchParams>;
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global.notifications");

	return {
		...(await getMetadata({
			title: t("title"),
			description: t("description", { title: t("title") }),
		})),
		...NO_INDEX_PAGE,
	};
}

const NotificationsPage: NextPage<IProps> = async props => {
	return <Notifications />;
};

export default NotificationsPage;
