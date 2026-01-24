import { NO_INDEX_PAGE } from "@constants/base"
import { getMetadata } from "@utils/base"
import type { Metadata, NextPage } from "next"
import { getTranslations } from "next-intl/server"

import { Notifications } from "@/components/screens/_notifications/Notifications"
import type { TSearchParams } from "@/shared/types"

interface IProps {
	searchParams: Promise<TSearchParams>
}

export async function generateMetadata({}: IProps): Promise<Metadata> {
	const t = await getTranslations("global")

	return {
		...(await getMetadata({
			title: t("notifications.title"),
			description: t("notifications.description", { title: t("logo") }),
			index: false
		})),
		...NO_INDEX_PAGE
	}
}

const NotificationsPage: NextPage<IProps> = async props => {
	return <Notifications />
}

export default NotificationsPage
