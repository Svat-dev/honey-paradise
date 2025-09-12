import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { PassportStrategy } from "@nestjs/passport/dist/passport/passport.strategy";
import { EnumProviderTypes } from "@prisma/client";
import { type Profile, Strategy } from "passport-yandex";
import { EnumApiRoute } from "../lib/common/constants";
import type { IProviderUser } from "../types/providers.type";

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, EnumProviderTypes.YANDEX) {
	constructor(private readonly config: ConfigService) {
		super({
			clientID: config.getOrThrow<string>("YANDEX_CLIENT_ID"),
			clientSecret: config.getOrThrow<string>("YANDEX_CLIENT_SECRET"),
			callbackURL: `${config.getOrThrow<string>("SERVER_URL")}/api${EnumApiRoute.OAUTH}${EnumApiRoute.OAUTH_CALLBACK}/yandex`,
		});
	}

	async validate(accessToken: string, refreshToken: string, profile: Profile, done: (err: any, user: any) => void) {
		const { emails, username, photos, provider, id } = profile;

		const user: IProviderUser = {
			email: emails[0].value,
			username,
			avatar: photos[0].value,
			provider,
			providerId: id,
			accessToken,
		};

		done(null, user);
	}
}
