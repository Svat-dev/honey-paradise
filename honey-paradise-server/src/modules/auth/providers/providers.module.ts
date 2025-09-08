import { AccountModule } from "../account/account.module";
import { GithubStrategy } from "src/shared/strategy/github.strategy";
import { GoogleStrategy } from "src/shared/strategy/google.strategy";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { NotificationsModule } from "src/modules/notifications/notifications.module";
import { OAuthController } from "./controllers/oauth.controller";
import { PassportModule } from "@nestjs/passport/dist/passport.module";
import { ProfileModule } from "../profile/profile.module";
import { ProvidersController } from "./controllers/providers.controller";
import { ProvidersService } from "./providers.service";
import { VkStrategy } from "src/shared/strategy/vk.strategy";
import { YandexStrategy } from "src/shared/strategy/yandex.strategy";

@Module({
	controllers: [ProvidersController, OAuthController],
	providers: [ProvidersService, GoogleStrategy, GithubStrategy, YandexStrategy, VkStrategy],
	imports: [PassportModule, ProfileModule, AccountModule, NotificationsModule],
})
export class ProvidersModule {}
