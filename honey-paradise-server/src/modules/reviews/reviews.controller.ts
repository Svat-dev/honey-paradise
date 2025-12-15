import { Controller } from "@nestjs/common/decorators/core/controller.decorator";
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator";
import { Get, Post } from "@nestjs/common/decorators/http/request-mapping.decorator";
import { Body, Query } from "@nestjs/common/decorators/http/route-params.decorator";
import { HttpStatus } from "@nestjs/common/enums/http-status.enum";
import { ApiTags } from "@nestjs/swagger";
import { ApiBody } from "@nestjs/swagger/dist/decorators/api-body.decorator";
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator";
import { ApiOkResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator";
import { SkipThrottle, Throttle } from "@nestjs/throttler/dist/throttler.decorator";
import { Authorization } from "src/shared/decorators/auth.decorator";
import { Authorized } from "src/shared/decorators/authorized.decorator";
import { EnumApiRoute } from "src/shared/lib/common/constants";
import { ms } from "src/shared/lib/common/utils";
import { ProductsIdsParserPipe } from "src/shared/pipes/products-ids-parser.pipe";
import { CreateReviewsDto } from "./dto/create-review.dto";
import { ReactToReviewDto } from "./dto/react-to-review.dto";
import { GetReviewsByPidResponse } from "./response/get-reviews-by-pid.res";
import { ReviewsService } from "./reviews.service";

@ApiTags("Reviews")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.REVIEWS)
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@ApiOperation({ summary: "Get reviews by product id", description: "" })
	@ApiOkResponse({ type: GetReviewsByPidResponse })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_PRODUCT_REVIEWS)
	getReviews(@Authorized("id") userId: string, @Query("id", ProductsIdsParserPipe) productId: string[]) {
		return this.reviewsService.getReviewsByProductId(userId || "", productId[0]);
	}

	@ApiOperation({ summary: "Create a new reviews", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: CreateReviewsDto })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 3, ttl: ms("1min") } })
	@Post(EnumApiRoute.CREATE_NEW_PRODUCT)
	createReviews(@Authorized("id") userId: string, @Body() dto: CreateReviewsDto) {
		return this.reviewsService.createReview(userId, dto);
	}

	@ApiOperation({ summary: "React to a reviews. Like or dislike", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: ReactToReviewDto })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 15, ttl: ms("3min") } })
	@Post(EnumApiRoute.REACT_TO_REVIEW)
	reactToReview(@Authorized("id") userId: string, @Body() dto: ReactToReviewDto) {
		return this.reviewsService.reactToReview(userId, dto);
	}
}
