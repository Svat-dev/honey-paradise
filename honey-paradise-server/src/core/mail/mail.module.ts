import { MailerModule } from "@nestjs-modules/mailer/dist/mailer.module"
import { Module } from "@nestjs/common/decorators/modules/module.decorator"
import { ConfigModule } from "@nestjs/config/dist/config.module"
import { ConfigService } from "@nestjs/config/dist/config.service"

import { getMailConfig } from "../config/mail.config"

import { MailService } from "./mail.service"

@Module({
	imports: [
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getMailConfig
		})
	],
	providers: [MailService],
	exports: [MailService]
})
export class MailModule {}
