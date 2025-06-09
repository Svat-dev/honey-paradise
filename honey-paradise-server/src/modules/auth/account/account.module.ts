import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { ProfileModule } from "../profile/profile.module";
import { AccountController } from "./account.controller";
import { AccountService } from "./account.service";

@Module({
	imports: [ProfileModule],
	controllers: [AccountController],
	providers: [AccountService],
})
export class AccountModule {}
