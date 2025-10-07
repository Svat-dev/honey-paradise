import {
	EnumCurrencies,
	EnumGenders,
	EnumLanguages,
	EnumThemes,
	EnumUserRoles,
	type NotificationSettings,
	type User,
	type UserSettings,
} from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class GetMySettingsResponse implements Partial<UserSettings> {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string;

	@ApiProperty({ enum: EnumLanguages, description: "", example: EnumLanguages.en })
	defaultLanguage?: EnumLanguages;

	@ApiProperty({ enum: EnumThemes, description: "", example: EnumThemes.LIGHT })
	defaultTheme?: EnumThemes;

	@ApiProperty({ enum: EnumCurrencies, description: "", example: EnumCurrencies.RUBLE })
	defaultCurrency: EnumCurrencies;

	@ApiProperty({ type: "boolean", description: "", example: true })
	useFullLogout: boolean;

	@ApiProperty({ type: "boolean", description: "", example: true })
	useTgTfaLogin: boolean;

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ description: "", example: new Date() })
	updatedAt: Date;
}

export class GetMyNotificationsSettingsResponse implements Partial<NotificationSettings> {
	@ApiProperty({ type: "number", description: "", example: "nanoid" })
	id: string;

	@ApiProperty({ type: "boolean", description: "", example: true })
	enabled: boolean;

	@ApiProperty({ type: "boolean", description: "", example: true })
	withSound: boolean;

	@ApiProperty({ type: "boolean", description: "", example: true })
	siteNotificationsType: boolean;

	@ApiProperty({ type: "boolean", description: "", example: true })
	telegramNotificationsType: boolean;

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ description: "", example: new Date() })
	updatedAt: Date;
}

export class GetMeResponse implements Partial<User> {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string;

	@ApiProperty({ enum: EnumUserRoles, description: "", example: EnumUserRoles.REGULAR })
	role: EnumUserRoles;

	@ApiProperty({ type: "boolean", description: "", example: true })
	isVerified: boolean;

	@ApiProperty({ type: "boolean", description: "", example: true })
	isTFAEnabled: boolean;

	@ApiProperty({ type: "string", description: "", example: "john_doe52" })
	username: string;

	@ApiProperty({ type: "string", description: "", example: "john@example.com" })
	email: string;

	@ApiProperty({ type: "string", description: "", example: "70000000000", nullable: true })
	phoneNumber?: string | undefined;

	@ApiProperty({ type: "string", description: "", example: "772493278234", nullable: true })
	telegramId?: string | undefined;

	@ApiProperty({ enum: EnumGenders, description: "", example: EnumGenders.OTHER })
	gender: EnumGenders;

	@ApiProperty({ type: "string", description: "", example: "https://example.com/avatar.png" })
	avatarPath: string;

	@ApiProperty({ description: "", example: new Date(), nullable: true })
	birthdate?: Date | undefined;

	@ApiProperty({ type: GetMySettingsResponse })
	settings: GetMySettingsResponse;

	@ApiProperty({ type: GetMyNotificationsSettingsResponse })
	notificationSettings: GetMyNotificationsSettingsResponse;

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ description: "", example: new Date() })
	updatedAt: Date;
}
