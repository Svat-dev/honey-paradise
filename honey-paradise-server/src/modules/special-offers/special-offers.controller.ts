import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ApiTags } from "@nestjs/swagger";
import { SpecialOffersService } from "./services/special-offers.service";

@ApiTags("Special Offers & Discounts")
@Controller("special-offers")
export class SpecialOffersController {
	constructor(private readonly specialOffersService: SpecialOffersService) {}
}
