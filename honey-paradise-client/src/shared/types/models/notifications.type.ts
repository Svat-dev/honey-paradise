export interface INotifications {}

export interface INotificationSettings {
	id: number;

	enabled: boolean;
	withSound: boolean;

	siteNotificationsType: boolean;
	telegramNotificationsType: boolean;

	createdAt: Date;
}
