import { TSessionBrowsers } from "@utils/types/get-browser-icon.type";

export type TDeviceTypes = "desktop" | "mobile" | "tablet";
export type TOsTypes = "android" | "ios" | "windows";

export interface ILocationInfo {
	country: string;
	city: string;
	latidute: number;
	longitude: number;
}

export interface IDeviceInfo {
	browser: TSessionBrowsers;
	os: TOsTypes;
	type: TDeviceTypes;
}

export interface ISessionMetadata {
	location: ILocationInfo;
	device: IDeviceInfo;
	ip: string;
}

export interface ISession {
	id: string;
	userId: string;
	createdAt: string;
	metadata: ISessionMetadata;
}
