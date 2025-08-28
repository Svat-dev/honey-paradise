import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { PassportModule } from "@nestjs/passport/dist/passport.module";
import { NotificationsModule } from "src/modules/notifications/notifications.module";
import { GithubStrategy } from "src/shared/strategy/github.strategy";
import { GoogleStrategy } from "src/shared/strategy/google.strategy";
import { VkStrategy } from "src/shared/strategy/vk.strategy";
import { YandexStrategy } from "src/shared/strategy/yandex.strategy";
import { AccountModule } from "../account/account.module";
import { ProfileModule } from "../profile/profile.module";
import { ProvidersController } from "./providers.controller";
import { ProvidersService } from "./providers.service";

@Module({
	controllers: [ProvidersController],
	providers: [ProvidersService, GoogleStrategy, GithubStrategy, YandexStrategy, VkStrategy],
	imports: [PassportModule, ProfileModule, AccountModule, NotificationsModule],
})
export class ProvidersModule {}
