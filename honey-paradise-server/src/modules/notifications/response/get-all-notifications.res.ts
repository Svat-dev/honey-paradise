import { EnumNotificationType, type Notification } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class GetMyNotificationResponse implements Partial<Notification> {
	@ApiProperty({ type: "string", description: "", example: "uuid" })
	id: string;

	@ApiProperty({ type: "string", description: "", example: "message" })
	message: string;

	@ApiProperty({ enum: EnumNotificationType, description: "", example: EnumNotificationType.ACCOUNT_STATUS })
	type: EnumNotificationType;

	@ApiProperty({ type: "boolean", description: "", example: false })
	isRead: boolean;

	@ApiProperty({ description: "", example: new Date() })
	createdAt: Date;

	@ApiProperty({ description: "", example: new Date() })
	updatedAt: Date;
}

export class GetAllNotificationsResponse {
	@ApiProperty({ type: GetMyNotificationResponse, isArray: true, description: "", example: [] })
	notifications: GetMyNotificationResponse[];

	@ApiProperty({ type: "number", description: "", example: 52 })
	length: number;

	@ApiProperty({ type: "number", description: "", example: 12 })
	unReadLength: number;
}
