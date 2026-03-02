import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { YookassaService } from "nestjs-yookassa/dist/yookassa.service"

@Injectable()
export class PaymentsService {
	constructor(private readonly yookassaService: YookassaService) {}
}
