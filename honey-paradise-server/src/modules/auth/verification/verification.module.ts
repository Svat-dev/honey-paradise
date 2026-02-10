import { Module } from "@nestjs/common/decorators/modules/module.decorator"
import { forwardRef } from "@nestjs/common/utils/forward-ref.util"
import { MailModule } from "src/core/mail/mail.module"
import { NotificationsModule } from "src/modules/notifications/notifications.module"

import { ProfileModule } from "../profile/profile.module"

import { VerificationService } from "./verification.service"

@Module({
	imports: [ProfileModule, MailModule, forwardRef(() => NotificationsModule)],
	providers: [VerificationService],
	exports: [VerificationService]
})
export class VerificationModule {}
