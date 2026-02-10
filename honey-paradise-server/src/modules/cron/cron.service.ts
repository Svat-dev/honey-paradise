import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { Logger } from "@nestjs/common/services/logger.service"
import { Cron } from "@nestjs/schedule/dist/decorators/cron.decorator"
import {
	EnumPromoTokensStatus,
	EnumPromoTokenTypes,
	EnumTokenTypes
} from "@prisma/client"
import { PrismaService } from "src/core/prisma/prisma.service"
import { TelegramService } from "src/core/telegram/telegram.service"
import { ms } from "src/shared/lib/common/utils"

// import { CronExpression } from "@nestjs/schedule/dist/enums/cron-expression.enum";

@Injectable()
export class CronService {
	private readonly logger = new Logger(CronService.name)

	constructor(
		private readonly prisma: PrismaService,
		private readonly telegramService: TelegramService
	) {}

	@Cron("0 0 0 * * 1", { timeZone: "UTC" })
	async manageExpiredNotifications() {
		const readNotifications = await this.prisma.notification.findMany({
			where: { isRead: true }
		})

		for (const { id, archivedAt, updatedAt } of readNotifications) {
			if (archivedAt) {
				const diff = new Date().getTime() - archivedAt.getTime()
				if (diff > ms("12w"))
					await this.prisma.notification.delete({ where: { id } })
				else continue
			} else {
				const diff = new Date().getTime() - updatedAt.getTime()
				if (diff > ms("12w"))
					await this.prisma.notification.update({
						where: { id },
						data: { archivedAt: new Date() }
					})
				continue
			}
		}

		return true
	}

	@Cron("0 0 1 1 *", { timeZone: "UTC" })
	async manageUsedCommonPromoTokens() {
		this.logger.log(`Happy ${new Date().getUTCFullYear()} year!`)

		await this.prisma.cart.updateMany({
			where: { usedPromoTokens: { isEmpty: false }, userId: { not: null } },
			data: { usedPromoTokens: { set: [] } }
		})
	}

	@Cron("0 0 * * *")
	async managePromoTokens() {
		const commonTypes = [
			EnumPromoTokenTypes.BIRTHDAY,
			EnumPromoTokenTypes.FIRST_ORDER
		]

		await this.prisma.promoToken.updateMany({
			where: {
				expiresAt: { lte: new Date() },
				status: EnumPromoTokensStatus.DEFAULT,
				type: { notIn: commonTypes }
			},
			data: { status: EnumPromoTokensStatus.EXPIRED }
		})

		await this.prisma.promoToken.deleteMany({
			where: {
				expiresAt: { lte: new Date() },
				status: EnumPromoTokensStatus.EXPIRED,
				type: { notIn: commonTypes }
			}
		})
	}

	@Cron("*/1 * * * *")
	async deleteExpiredTokens() {
		const expiredTokens = await this.prisma.token.findMany({
			where: { expiresIn: { lt: new Date() } },
			select: { id: true, type: true, user: { select: { telegramId: true } } }
		})

		for (const { id, type, user } of expiredTokens) {
			try {
				await this.prisma.token.delete({ where: { id } })

				if (user.telegramId && type === EnumTokenTypes.TELEGRAM_TFA_AUTH) {
					await this.telegramService.sendTelegramAuthCodeExpired(
						Number(user.telegramId)
					)
				}
			} catch (error) {
				this.logger.error(`Error while deleting expired token!. ID ${id}`)
			}
		}

		return true
	}
}
