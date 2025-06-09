import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import type { OnModuleDestroy } from "@nestjs/common/interfaces/hooks/on-destroy.interface";
import type { OnModuleInit } from "@nestjs/common/interfaces/hooks/on-init.interface";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	public async onModuleInit() {
		await this.$connect();
	}

	public async onModuleDestroy() {
		await this.$disconnect();
	}
}
