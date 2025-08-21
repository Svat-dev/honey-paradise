import { IsBoolean, IsOptional } from "class-validator";

import type { NotificationSettings } from "@prisma/client";

export class UpdateNotificationsSettingsDto implements Partial<NotificationSettings> {
	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	enabled?: boolean;

	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	withSound?: boolean;

	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	siteNotificationsType?: boolean;

	@IsBoolean({ message: "" })
	@IsOptional({ message: "" })
	telegramNotificationsType?: boolean;
}
