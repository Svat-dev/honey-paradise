import { EnumNotificationType } from "@/shared/types/models";
import { useTranslations } from "next-intl";

export function getNotificationHeadingByType(type: EnumNotificationType, dt?: any): string {
	const t = dt || useTranslations("global.notifications.content");

	switch (type) {
		case EnumNotificationType.ACCOUNT_STATUS:
			return t("notification.type.accountStatus");
		case EnumNotificationType.ORDER_STATUS:
			return t("notification.type.orderStatus");
		case EnumNotificationType.SPECIAL_OFFERS:
			return t("notification.type.specialOffers");
		case EnumNotificationType.TELEGRAM:
			return t("notification.type.telegram");

		default:
			return "";
	}
}
