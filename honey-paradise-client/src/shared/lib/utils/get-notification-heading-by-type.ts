import { EnumNotificationType } from "@/shared/types/models";

export function getNotificationHeadingByType(type: EnumNotificationType) {
	let heading: string = "";

	if (type === EnumNotificationType.ACCOUNT_STATUS) heading = "Безопасность аккаунта";
	else if (type === EnumNotificationType.ORDER_STATUS) heading = "Статус вашего заказа";
	else if (type === EnumNotificationType.SPECIAL_OFFERS) heading = "Специальное предложение";

	return heading;
}
