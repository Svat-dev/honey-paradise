export type TSettingsTabTypes = "profile" | "account" | "notifications" | "devices";

export interface ISettingsTab {
	title: string;
	href: TSettingsTabTypes;
}
