import { Controller } from "@nestjs/common/decorators/core/controller.decorator"
import { HttpCode } from "@nestjs/common/decorators/http/http-code.decorator"
import {
	Delete,
	Get,
	Patch,
	Post,
	Put
} from "@nestjs/common/decorators/http/request-mapping.decorator"
import {
	Body,
	Param,
	Query,
	Req
} from "@nestjs/common/decorators/http/route-params.decorator"
import { HttpStatus } from "@nestjs/common/enums/http-status.enum"
import { ParseUUIDPipe } from "@nestjs/common/pipes/parse-uuid.pipe"
import { ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger"
import { ApiBody } from "@nestjs/swagger/dist/decorators/api-body.decorator"
import { ApiOperation } from "@nestjs/swagger/dist/decorators/api-operation.decorator"
import { ApiOkResponse } from "@nestjs/swagger/dist/decorators/api-response.decorator"
import {
	SkipThrottle,
	Throttle
} from "@nestjs/throttler/dist/throttler.decorator"
import type { Request } from "express"
import { Authorization } from "src/shared/decorators/auth.decorator"
import { Authorized } from "src/shared/decorators/authorized.decorator"
import { EnumApiRoute } from "src/shared/lib/common/constants"
import { ms } from "src/shared/lib/common/utils"

import { CreateReviewsDto } from "./dto/create-review.dto"
import { GetReviewsQueryDto } from "./dto/get-reviews-query.dto"
import { ReactToReviewDto } from "./dto/react-to-review.dto"
import { UpdateReviewDto } from "./dto/update-review.dto"
import { GetReviewsByPidResponse } from "./response/get-reviews-by-pid.res"
import { ReviewsService } from "./reviews.service"

@ApiTags("Reviews")
@SkipThrottle({ auth: true })
@Controller(EnumApiRoute.REVIEWS)
export class ReviewsController {
	constructor(private readonly reviewsService: ReviewsService) {}

	@ApiOperation({ summary: "Get reviews by product id", description: "" })
	@ApiOkResponse({ type: GetReviewsByPidResponse })
	@ApiQuery({ type: GetReviewsQueryDto })
	@HttpCode(HttpStatus.OK)
	@Get(EnumApiRoute.GET_PRODUCT_REVIEWS)
	getReviews(@Req() req: Request, @Query() query: GetReviewsQueryDto) {
		return this.reviewsService.getReviewsByProductId(req.session.userId, query)
	}

	@ApiOperation({ summary: "Create a new reviews", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: CreateReviewsDto })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 3, ttl: ms("10min") } })
	@Post(EnumApiRoute.CREATE_NEW_PRODUCT)
	createReviews(
		@Authorized("id") userId: string,
		@Body() dto: CreateReviewsDto
	) {
		return this.reviewsService.createReview(userId, dto)
	}

	@ApiOperation({ summary: "Edit a review", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: UpdateReviewDto })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 5, ttl: ms("3min") } })
	@Put(EnumApiRoute.EDIT_REVIEW)
	editReviews(@Authorized("id") userId: string, @Body() dto: UpdateReviewDto) {
		return this.reviewsService.editReview(userId, dto)
	}

	@ApiOperation({
		summary: "React to a reviews. Like or dislike",
		description: ""
	})
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiBody({ type: ReactToReviewDto })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 15, ttl: ms("3min") } })
	@Patch(EnumApiRoute.REACT_TO_REVIEW)
	reactToReview(
		@Authorized("id") userId: string,
		@Body() dto: ReactToReviewDto
	) {
		return this.reviewsService.reactToReview(userId, dto)
	}

	@ApiOperation({ summary: "Delete user review", description: "" })
	@ApiOkResponse({ type: Boolean, example: true })
	@ApiParam({ name: "id", type: String, example: "uuid" })
	@HttpCode(HttpStatus.OK)
	@Authorization()
	@Throttle({ default: { limit: 5, ttl: ms("3min") } })
	@Delete(EnumApiRoute.DELETE_REVIEW)
	deleteReview(
		@Authorized("id") userId: string,
		@Param("id", new ParseUUIDPipe({ version: "4" })) reviewId: string
	) {
		return this.reviewsService.deleteReview(userId, reviewId)
	}
}
