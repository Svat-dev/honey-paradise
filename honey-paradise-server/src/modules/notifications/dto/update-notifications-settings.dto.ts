import { IsBoolean, IsNotEmpty, IsOptional } from "class-validator";

import type { NotificationSettings } from "@prisma/client";

export class UpdateNotificationsSettingsDto implements Partial<NotificationSettings> {
	@IsNotEmpty({ message: "" })
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	enabled?: boolean;

	@IsNotEmpty({ message: "" })
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	withSound?: boolean;

	@IsNotEmpty({ message: "" })
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	siteNotificationsType?: boolean;

	@IsNotEmpty({ message: "" })
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	telegramNotificationsType?: boolean;
}
