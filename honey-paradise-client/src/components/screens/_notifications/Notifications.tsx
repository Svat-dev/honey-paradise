import { getTranslations } from "next-intl/server"

import { Title } from "@/components/ui/common"

import { NotificationsContent } from "./components/NotificationsContent"

const Notifications = async () => {
	const t = await getTranslations("global.notifications.content")

	return (
		<article className="relative mx-10 my-6 w-full">
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			<p className="mb-4 ml-1 text-muted">{t("description")}</p>

			<NotificationsContent />
		</article>
	)
}

export { Notifications }
