import { ReactToReviewDto, ReactToReviewType } from "./dto/react-to-review.dto";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { EnumNotificationType } from "@prisma/client";
import { PrismaService } from "src/core/prisma/prisma.service";
import { reviewsOutput } from "src/shared/lib/prisma/outputs/Reviews.output";
import { ProfileService } from "../auth/profile/profile.service";
import { NotificationsService } from "../notifications/notifications.service";
import { ProductsService } from "../products/services/products.service";
import type { CreateReviewsDto } from "./dto/create-review.dto";
import type { UpdateReviewDto } from "./dto/update-review.dto";
import type { GetReviewsByPidResponse } from "./response/get-reviews-by-pid.res";

@Injectable()
export class ReviewsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly productsService: ProductsService,
		private readonly profileService: ProfileService,
		private readonly notificationsService: NotificationsService
	) {}

	async getReviewsByProductId(userId: string, productId: string): Promise<GetReviewsByPidResponse> {
		const mostPopular = await this.prisma.review.findFirst({
			where: { productId },
			select: reviewsOutput,
			orderBy: { likesCount: "desc" },
		});

		const userReview = userId
			? await this.prisma.review.findFirst({
					where: { userId, productId },
					select: reviewsOutput,
				})
			: undefined;

		const reviews = await this.prisma.review.findMany({
			where: { productId, NOT: [{ id: mostPopular.id }, { id: userReview?.id }] },
			select: reviewsOutput,
			take: 5,
			orderBy: { createdAt: "desc" },
		});

		if (mostPopular) reviews.unshift(mostPopular);
		if (userReview) reviews.unshift(userReview);

		return { reviews, isHasReview: !!userReview };
	}

	async createReview(userId: string, dto: CreateReviewsDto) {
		const { text, productId, rating } = dto;

		const { id: pid } = await this.productsService.getProductsByIds(productId);

		await this.prisma.review.create({
			data: {
				text,
				rating: { toJSON: () => rating },
				product: { connect: { id: pid } },
				user: { connect: { id: userId } },
			},
		});

		await this.countProductRating(productId);

		return true;
	}

	async editReview(userId: string, dto: UpdateReviewDto): Promise<boolean> {
		const { reviewId, rating, text } = dto;

		const review = await this.prisma.review.findUnique({
			where: { id: reviewId },
			select: { userId: true, productId: true },
		});

		if (!review) throw new NotFoundException("Review wasn't found!"); // TODO translate

		if (review.userId !== userId) throw new ForbiddenException("You can't edit this review!"); // TODO translate

		await this.prisma.review.update({
			where: { id: reviewId },
			data: {
				text,
				rating: rating ? { toJSON: () => rating } : undefined,
			},
		});

		await this.countProductRating(review.productId);

		return true;
	}

	async reactToReview(userId: string, dto: ReactToReviewDto): Promise<boolean> {
		let review = await this.prisma.review.findUnique({
			where: { id: dto.reviewId },
			select: { id: true, userId: true, likes: true, dislikes: true },
		});

		if (!review) throw new NotFoundException("Review wasn't found!"); // TODO translate

		const { username } = await this.profileService.getProfile(userId, "id");
		const reverted = dto.type === ReactToReviewType.LIKE ? "dislikes" : "likes";

		if (review[`${dto.type}s`].includes(userId)) {
			review = await this.prisma.review.update({
				where: { id: dto.reviewId },
				data: { [`${dto.type}s`]: { set: review[`${dto.type}s`].filter((id: string) => id !== userId) } },
				select: { id: true, userId: true, likes: true, dislikes: true },
			});
		} else {
			review = await this.prisma.review.update({
				where: { id: dto.reviewId },
				data: {
					[`${dto.type}s`]: { push: userId },
					[reverted]: { set: review[reverted].filter((id: string) => id !== userId) },
				},
				select: { id: true, userId: true, likes: true, dislikes: true },
			});

			if (review.userId !== userId)
				await this.notificationsService.send(
					review.userId,
					`Пользователь ${username} только что отреагировал на ваш отзыв!`,
					EnumNotificationType.ACCOUNT_STATUS
				); // TODO add new notification type
		}

		await this.prisma.review.update({
			where: { id: review.id },
			data: { likesCount: review.likes.length - review.dislikes.length },
		});

		return true;
	}

	private async countProductRating(productId: string) {
		const reviews = await this.prisma.review.findMany({
			where: { productId },
			select: { rating: true },
		});

		const { rating, count } = reviews.reduce<any>(
			({ rating: accRating, count }, { rating }) => {
				return {
					rating: {
						common: accRating["common"] + rating["common"],
						taste: accRating["taste"] + rating["taste"],
						aroma: accRating["aroma"] + rating["aroma"],

						packaging: accRating["packaging"] + rating["packaging"],
					},
					count: {
						common: count["common"] + 1,
						taste: rating["taste"] !== 0 ? count["taste"] + 1 : count["taste"],
						aroma: rating["aroma"] !== 0 ? count["aroma"] + 1 : count["aroma"],
						packaging: rating["packaging"] !== 0 ? count["packaging"] + 1 : count["packaging"],
					},
				};
			},
			{
				rating: { common: 0, taste: 0, aroma: 0, packaging: 0 },
				count: { common: 0, taste: 0, aroma: 0, packaging: 0 },
			}
		);

		for (const key in rating) {
			if (count[key] !== 0) {
				rating[key] = Math.round((rating[key] / count[key]) * 100) / 100;
			}
		}

		const { common, ...other } = rating;

		await this.prisma.product.update({
			where: { id: productId },
			data: {
				rating: common,
				extraRating: { toJSON: () => other },
			},
		});

		return true;
	}
}
