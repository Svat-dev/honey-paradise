import { Title } from "@/components/ui/common";
import { NotificationsContent } from "./components/NotificationsContent";

const Notifications = () => {
	return (
		<article className="tw-relative tw-w-full tw-my-6 tw-mx-10">
			<Title size="lg" className="tw-font-bold">
				{"Уведомления"}
			</Title>

			<p className="tw-ml-1 tw-mb-4 tw-text-muted">
				{
					"Здесь находятся все уведомления за последние 3 месяца, которые приходили к вам, включая уведомления о заказе, безопасности аккаунта и другие"
				}
			</p>

			<NotificationsContent />
		</article>
	);
};

export { Notifications };
