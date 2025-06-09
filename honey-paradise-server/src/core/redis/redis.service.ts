import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConfigService } from "@nestjs/config/dist/config.service";
import Redis from "ioredis";

@Injectable()
export class RedisService extends Redis {
	public constructor(private readonly configService: ConfigService) {
		super(configService.getOrThrow<string>("REDIS_URI"));
	}
}
