import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { ProfileService } from "./profile.service";

@Controller("profile")
export class ProfileController {
	constructor(private readonly profileService: ProfileService) {}
}
