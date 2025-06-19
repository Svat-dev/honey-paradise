import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { ProfileService } from "./profile.service";

@Controller(EnumApiRoute.PROFILE)
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}
}
