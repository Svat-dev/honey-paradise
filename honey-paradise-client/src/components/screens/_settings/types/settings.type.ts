export enum EnumSettingsTabTypes {
	PROFILE = "profile",
	ACCOUNT = "account",
	NOTIFICATIONS = "notifications",
	DEVICES = "devices",
}

export interface ISettingsTab {
	title: string;
	href: EnumSettingsTabTypes;
	label: string;
}
