import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

import { ApiProperty } from "@nestjs/swagger";
import type { NotificationSettings } from "@prisma/client";

export class UpdateNotificationsSettingsDto implements Partial<NotificationSettings> {
	@ApiProperty({ type: "boolean", description: "", example: false, required: false })
	@IsNotEmpty({ message: "" })
	@IsBoolean({ message: "" })
	@IsOptional()
	enabled?: boolean;

	@ApiProperty({ type: "boolean", description: "", example: false, required: false })
	@IsNotEmpty({ message: "" })
	@IsBoolean({ message: "" })
	@IsOptional()
	withSound?: boolean;

	@ApiProperty({ type: "boolean", description: "", example: false, required: false })
	@IsNotEmpty({ message: "" })
	@IsBoolean({ message: "" })
	@IsOptional()
	siteNotificationsType?: boolean;

	@ApiProperty({ type: "boolean", description: "", example: false, required: false })
	@IsNotEmpty({ message: "" })
	@IsBoolean({ message: "" })
	@IsOptional()
	telegramNotificationsType?: boolean;
}
