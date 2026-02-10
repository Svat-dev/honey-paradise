import { Module } from "@nestjs/common/decorators/modules/module.decorator"

import { ProfileModule } from "../auth/profile/profile.module"
import { NotificationsModule } from "../notifications/notifications.module"
import { ProductsModule } from "../products/products.module"

import { ReviewsController } from "./reviews.controller"
import { CommentaryService } from "./services/commentary.service"
import { ReviewsService } from "./services/reviews.service"

@Module({
	controllers: [ReviewsController],
	providers: [ReviewsService, CommentaryService],
	imports: [ProductsModule, ProfileModule, NotificationsModule]
})
export class ReviewsModule {}
