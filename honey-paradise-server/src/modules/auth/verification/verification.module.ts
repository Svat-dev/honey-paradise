import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { MailModule } from "src/core/mail/mail.module";
import { ProfileModule } from "../profile/profile.module";
import { VerificationService } from "./verification.service";

@Module({
	imports: [ProfileModule, MailModule],
	providers: [VerificationService],
	exports: [VerificationService],
})
export class VerificationModule {}
