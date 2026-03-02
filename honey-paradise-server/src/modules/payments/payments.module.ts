import { Module } from "@nestjs/common/decorators/modules/module.decorator"
import { ConfigModule } from "@nestjs/config/dist/config.module"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { YookassaModule } from "nestjs-yookassa/dist/yookassa.module"
import { getYookassaConfig } from "src/core/config/yookassa.config"

import { PaymentsController } from "./payments.controller"
import { PaymentsService } from "./payments.service"

@Module({
	imports: [
		YookassaModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: getYookassaConfig,
			inject: [ConfigService]
		})
	],
	controllers: [PaymentsController],
	providers: [PaymentsService]
})
export class PaymentsModule {}
