import type { EnumNotificationType } from "./enums.type";

export interface INotificationResponse {
	id: string;

	message: string;
	type: EnumNotificationType;
	isRead: boolean;

	createdAt: string;
	updatedAt: string;
}

export interface INotificationSettings {
	id: number;

	enabled: boolean;
	withSound: boolean;

	siteNotificationsType: boolean;
	telegramNotificationsType: boolean;

	createdAt: Date;
	updatedAt: Date;
}
