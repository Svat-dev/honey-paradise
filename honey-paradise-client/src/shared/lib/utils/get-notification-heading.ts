import { useTranslations } from "next-intl"

import { GetMyNotificationResponseType } from "@/shared/types/server"

export function getNotificationHeadingByType(
	type: GetMyNotificationResponseType,
	dt?: any
): string {
	const t = dt || useTranslations("global.notifications.content")

	switch (type) {
		case GetMyNotificationResponseType.ACCOUNT_STATUS:
			return t("notification.type.accountStatus")
		case GetMyNotificationResponseType.ORDER_STATUS:
			return t("notification.type.orderStatus")
		case GetMyNotificationResponseType.SPECIAL_OFFERS:
			return t("notification.type.specialOffers")
		case GetMyNotificationResponseType.TELEGRAM:
			return t("notification.type.telegram")

		default:
			return ""
	}
}
