import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { ApiTags } from "@nestjs/swagger"
import { EnumApiRoute } from "src/shared/lib/common/constants"

import { SpecialOffersService } from "../services/special-offers.service"

@ApiTags("Special Offers")
@Controller(EnumApiRoute.SPECIAL_OFFERS)
export class SpecialOffersController {
	constructor(private readonly specialOffersService: SpecialOffersService) {}
}
