import { Title } from "@/components/ui/common";
import { getTranslations } from "next-intl/server";
import { NotificationsContent } from "./components/NotificationsContent";

const Notifications = async () => {
	const t = await getTranslations("global.notifications.content");

	return (
		<article className="tw-relative tw-w-full tw-my-6 tw-mx-10">
			<Title size="lg" className="tw-font-bold">
				{t("title")}
			</Title>

			<p className="tw-ml-1 tw-mb-4 tw-text-muted">{t("description")}</p>

			<NotificationsContent />
		</article>
	);
};

export { Notifications };
