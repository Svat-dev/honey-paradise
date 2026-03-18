import { Module } from "@nestjs/common/decorators/modules/module.decorator"

import { AuthController } from "./auth.controller"
import { ProfileModule } from "./profile/profile.module"
import { SessionsModule } from "./sessions/sessions.module"

@Module({
	imports: [ProfileModule, SessionsModule],
	controllers: [AuthController]
})
export class AuthModule {}
