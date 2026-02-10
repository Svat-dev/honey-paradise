import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { ForbiddenException } from "@nestjs/common/exceptions/forbidden.exception"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { EnumNotificationType } from "@prisma/client"
import { PrismaService } from "src/core/prisma/prisma.service"
import { NotificationsService } from "src/modules/notifications/notifications.service"

import type { CreateCommentDto } from "../dto/create-comment.dto"
import type { ReplyToCommentDto } from "../dto/reply-to-comment.dto"
import type { GetCommentsResponse } from "../response/get-comments-by-rid.res"

@Injectable()
export class CommentaryService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly notificationsService: NotificationsService
	) {}

	async getCommentsById(
		userId: string,
		reviewId: string
	): Promise<GetCommentsResponse[]> {
		try {
			const query: GetCommentsResponse[] = await this.prisma.$queryRaw`
        SELECT
          cm.id,
          cm.text,
          row_to_json(reply_part)::json AS "reply",
          row_to_json(u_part)::json AS "user",
					CASE WHEN cm."user_id" = (${userId})::uuid THEN true ELSE false END AS "isOwner",
          cm.created_at AS "createdAt"
        FROM commentaries cm
        LEFT JOIN (
          SELECT id, LEFT(text, 20) AS "text"
          FROM commentaries
        ) reply_part ON (cm.reply_to_id)::text = (reply_part.id)::text
        INNER JOIN (
          SELECT id, username, avatar_path AS "avatarPath", frame_path AS "framePath"
          FROM users
        ) u_part ON cm.user_id = u_part.id
        WHERE cm.review_id = (${reviewId})::uuid
        ORDER BY cm.created_at DESC
        LIMIT 16
      `

			return query
		} catch (error) {
			throw new InternalServerErrorException(error)
		}
	}

	async createComment(userId: string, dto: CreateCommentDto): Promise<boolean> {
		const { reviewId, text } = dto

		const review = await this.prisma.review.findUnique({
			where: { id: reviewId },
			select: { id: true, userId: true }
		})

		if (!review) throw new NotFoundException("Review not found")

		await this.prisma.commentary.create({
			data: {
				text,
				user: { connect: { id: userId } },
				review: { connect: { id: review.id } }
			}
		})

		return true
	}

	async replyToComment(
		username: string,
		dto: ReplyToCommentDto
	): Promise<boolean> {
		const { commentId, text } = dto

		const comment = await this.prisma.commentary.findUnique({
			where: { id: commentId },
			select: { id: true, reviewId: true, userId: true }
		})

		if (!comment) throw new NotFoundException("Comment wasn't found!") // TODO translate

		await this.prisma.commentary.create({
			data: {
				text,
				user: { connect: { username } },
				review: { connect: { id: comment.reviewId } },
				replyToId: comment.id
			}
		})

		await this.notificationsService.send(
			comment.userId,
			`Пользователь ${username} ответил на ваш комментарий!`,
			EnumNotificationType.ACCOUNT_STATUS
		)

		return true
	}

	async deleteComment(userId: string, commentId: string): Promise<boolean> {
		const comment = await this.prisma.commentary.findUnique({
			where: { id: commentId },
			select: { userId: true }
		})

		if (!comment) throw new NotFoundException("Commentary wasn't found!") // TODO translate

		if (comment.userId !== userId)
			throw new ForbiddenException("You can't delete this commentary!") // TODO translate

		await this.prisma.commentary.delete({
			where: { id: commentId }
		})

		return true
	}
}
