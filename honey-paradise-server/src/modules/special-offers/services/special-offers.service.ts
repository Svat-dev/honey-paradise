import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { PrismaService } from "src/core/prisma/prisma.service";

@Injectable()
export class SpecialOffersService {
	constructor(private readonly prisma: PrismaService) {}
}
