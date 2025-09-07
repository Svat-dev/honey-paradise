import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { NotificationGateway } from "../../shared/websockets/notifications.gateway";
import { NotificationsController } from "./notifications.controller";
import { NotificationsService } from "./notifications.service";
import { ProfileModule } from "src/modules/auth/profile/profile.module";
import { VerificationModule } from "../auth/verification/verification.module";
import { forwardRef } from "@nestjs/common/utils/forward-ref.util";

@Module({
	controllers: [NotificationsController],
	imports: [ProfileModule, forwardRef(() => VerificationModule)],
	providers: [NotificationsService, NotificationGateway],
	exports: [NotificationsService],
})
export class NotificationsModule {}
