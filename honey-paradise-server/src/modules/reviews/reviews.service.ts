import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { EnumNotificationType } from "@prisma/client"
import { PrismaService } from "src/core/prisma/prisma.service"

import { ProfileService } from "../auth/profile/profile.service"
import { NotificationsService } from "../notifications/notifications.service"
import { ProductsService } from "../products/services/products.service"

import type { CreateReviewsDto } from "./dto/create-review.dto"
import type { GetReviewsQueryDto } from "./dto/get-reviews-query.dto"
import { ReactToReviewDto, ReactToReviewType } from "./dto/react-to-review.dto"
import type { UpdateReviewDto } from "./dto/update-review.dto"
import type { GetReviewsByPidResponse } from "./response/get-reviews-by-pid.res"

@Injectable()
export class ReviewsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly productsService: ProductsService,
		private readonly profileService: ProfileService,
		private readonly notificationsService: NotificationsService
	) {}

	async getReviewsByProductId(
		userId: string,
		query: GetReviewsQueryDto
	): Promise<GetReviewsByPidResponse> {
		try {
			const data: any = await this.prisma.$queryRaw`
				WITH most_popular AS (
					SELECT "id", "user_id", "text", "rating", "likes", "dislikes", "created_at"
					FROM "reviews"
					WHERE "product_id" = (${query.pid})::uuid
					ORDER BY "likes_count" DESC
					LIMIT 1
				),
				user_review AS (
					SELECT "id", "user_id", "text", "rating", "likes", "dislikes", "created_at"
					FROM "reviews"
					WHERE "user_id" = (${userId})::uuid AND "product_id" = (${query.pid})::uuid
					LIMIT 1
				)
				SELECT
					r."id",
					r."user_id",
					r."text",
					r."rating",
					r."created_at" AS "createdAt",
					array_length(r."likes", 1) AS "likes",
					array_length(r."dislikes", 1) AS "dislikes",
					(${userId})::text = ANY(r."likes") AS "isLiked",
					(${userId})::text = ANY(r."dislikes") AS "isDisliked",
					ROW_TO_JSON(u_part)::json AS "user",
					-- Добавляем флаги для идентификации
					CASE WHEN r."id" = (SELECT "id" FROM most_popular)::uuid THEN true END AS "type",
					CASE WHEN r."id" = (SELECT "id" FROM user_review)::uuid THEN true END AS "userType"
				FROM "reviews" r
				INNER JOIN (
					SELECT "id", "username", "avatar_path" AS "avatarPath", "frame_path" AS "framePath"
					FROM "users"
				) u_part ON r."user_id" = u_part."id"
				WHERE r."product_id" = (${query.pid})::uuid
					-- AND (r."rating"->'common')::text ILIKE (${query.rating ? query.rating : "%"})::text -- убран так как из-за этого mostPopular и userReview не появляется
				ORDER BY
					CASE
						WHEN (${query.sort})::text = 'oldest' THEN r."created_at"
					END ASC,
					CASE
						WHEN (${query.sort})::text = 'rating' THEN r."likes_count"
					END DESC,
					CASE
						WHEN (${query.sort})::text NOT IN ('oldest', 'rating') OR (${query.sort})::text IS NULL THEN r."created_at"
					END DESC
				LIMIT 5;
			`

			let returnData: GetReviewsByPidResponse = {
				reviews: [],
				mostPopularReview: undefined,
				userReview: undefined
			}

			for (const review of data) {
				const item = {
					id: review.id,
					text: review.text,
					rating: review.rating,
					likes: review.likes,
					dislikes: review.dislikes,
					isLiked: review.isLiked,
					isDisliked: review.isDisliked,
					createdAt: review.createdAt,
					user: review.user
				}

				if (review.type) returnData.mostPopularReview = item

				if (review.userType) returnData.userReview = item

				if (!review.type && !review.userType) returnData.reviews.push(item)
			}

			return returnData
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	async createReview(userId: string, dto: CreateReviewsDto) {
		const { text, productId, rating } = dto

		const { id: pid } = await this.productsService.getProductsByIds(productId)

		await this.prisma.review.create({
			data: {
				text,
				rating: { toJSON: () => rating },
				product: { connect: { id: pid } },
				user: { connect: { id: userId } }
			}
		})

		await this.countProductRating(productId)

		return true
	}

	async editReview(userId: string, dto: UpdateReviewDto): Promise<boolean> {
		const { reviewId, rating, text } = dto

		const review = await this.prisma.review.findUnique({
			where: { id: reviewId },
			select: { userId: true, productId: true }
		})

		if (!review) throw new NotFoundException("Review wasn't found!") // TODO translate

		if (review.userId !== userId)
			throw new ForbiddenException("You can't edit this review!") // TODO translate

		await this.prisma.review.update({
			where: { id: reviewId },
			data: {
				text,
				rating: rating ? { toJSON: () => rating } : undefined
			}
		})

		await this.countProductRating(review.productId)

		return true
	}

	async reactToReview(userId: string, dto: ReactToReviewDto): Promise<boolean> {
		let review = await this.prisma.review.findUnique({
			where: { id: dto.reviewId },
			select: { id: true, userId: true, likes: true, dislikes: true }
		})

		if (!review) throw new NotFoundException("Review wasn't found!") // TODO translate

		const { username } = await this.profileService.getProfile(userId, "id")
		const reverted = dto.type === ReactToReviewType.LIKE ? "dislikes" : "likes"

		if (review[`${dto.type}s`].includes(userId)) {
			review = await this.prisma.review.update({
				where: { id: dto.reviewId },
				data: {
					[`${dto.type}s`]: {
						set: review[`${dto.type}s`].filter((id: string) => id !== userId)
					}
				},
				select: { id: true, userId: true, likes: true, dislikes: true }
			})
		} else {
			review = await this.prisma.review.update({
				where: { id: dto.reviewId },
				data: {
					[`${dto.type}s`]: { push: userId },
					[reverted]: {
						set: review[reverted].filter((id: string) => id !== userId)
					}
				},
				select: { id: true, userId: true, likes: true, dislikes: true }
			})

			if (review.userId !== userId)
				await this.notificationsService.send(
					review.userId,
					`Пользователь ${username} только что отреагировал на ваш отзыв!`,
					EnumNotificationType.ACCOUNT_STATUS
				) // TODO add new notification type
		}

		await this.prisma.review.update({
			where: { id: review.id },
			data: { likesCount: review.likes.length - review.dislikes.length }
		})

		return true
	}

	async deleteReview(userId: string, reviewId: string): Promise<boolean> {
		const review = await this.prisma.review.findUnique({
			where: { id: reviewId },
			select: { userId: true, productId: true }
		})

		if (!review) throw new NotFoundException("Review wasn't found!") // TODO translate

		if (review.userId !== userId)
			throw new ForbiddenException("You can't delete this review!") // TODO translate

		await this.prisma.review.delete({
			where: { id: reviewId }
		})

		await this.countProductRating(review.productId)

		return true
	}

	private async countProductRating(productId: string) {
		const reviews = await this.prisma.review.findMany({
			where: { productId },
			select: { rating: true }
		})

		const { rating, count } = reviews.reduce<any>(
			({ rating: accRating, count }, { rating }) => {
				return {
					rating: {
						common: accRating["common"] + rating["common"],
						taste: accRating["taste"] + rating["taste"],
						aroma: accRating["aroma"] + rating["aroma"],

						packaging: accRating["packaging"] + rating["packaging"]
					},
					count: {
						common: count["common"] + 1,
						taste: rating["taste"] !== 0 ? count["taste"] + 1 : count["taste"],
						aroma: rating["aroma"] !== 0 ? count["aroma"] + 1 : count["aroma"],
						packaging:
							rating["packaging"] !== 0
								? count["packaging"] + 1
								: count["packaging"]
					}
				}
			},
			{
				rating: { common: 0, taste: 0, aroma: 0, packaging: 0 },
				count: { common: 0, taste: 0, aroma: 0, packaging: 0 }
			}
		)

		for (const key in rating) {
			if (count[key] !== 0) {
				rating[key] = Math.round((rating[key] / count[key]) * 100) / 100
			}
		}

		const { common, ...other } = rating

		await this.prisma.product.update({
			where: { id: productId },
			data: {
				rating: common,
				extraRating: { toJSON: () => other }
			}
		})

		return true
	}
}
