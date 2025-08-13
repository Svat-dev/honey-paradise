import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "src/modules/auth/profile/profile.module";
import { NotificationGateway } from "../../shared/websockets/notifications.gateway";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";

@Module({
	controllers: [NotificationsController],
	imports: [ProfileModule],
	providers: [NotificationsService, NotificationGateway],
	exports: [NotificationsService],
})
export class NotificationsModule {}
