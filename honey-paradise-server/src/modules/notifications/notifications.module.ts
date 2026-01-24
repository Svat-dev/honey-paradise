import { Module } from "@nestjs/common/decorators/modules/module.decorator"
import { forwardRef } from "@nestjs/common/utils/forward-ref.util"
import { ProfileModule } from "src/modules/auth/profile/profile.module"

import { NotificationGateway } from "../../shared/websockets/notifications.gateway"
import { VerificationModule } from "../auth/verification/verification.module"

import { NotificationsController } from "./notifications.controller"
import { NotificationsService } from "./notifications.service"

@Module({
	controllers: [NotificationsController],
	imports: [ProfileModule, forwardRef(() => VerificationModule)],
	providers: [NotificationsService, NotificationGateway],
	exports: [NotificationsService]
})
export class NotificationsModule {}
