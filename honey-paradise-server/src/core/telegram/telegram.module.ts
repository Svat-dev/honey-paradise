import { Global } from "@nestjs/common/decorators/modules/global.decorator";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "src/modules/auth/profile/profile.module";
import { SessionsGateway } from "src/shared/websockets/sessions.gateway";
import { TelegramService } from "./telegram.service";
import { VerificationModule } from "src/modules/auth/verification/verification.module";

@Global()
@Module({
	imports: [ProfileModule, VerificationModule],
	providers: [TelegramService, SessionsGateway],
	exports: [TelegramService],
})
export class TelegramModule {}
