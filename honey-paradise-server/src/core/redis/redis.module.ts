import { Global } from "@nestjs/common/decorators/modules/global.decorator";
import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { RedisService } from "./redis.service";

@Global()
@Module({
	providers: [RedisService],
	exports: [RedisService],
})
export class RedisModule {}
