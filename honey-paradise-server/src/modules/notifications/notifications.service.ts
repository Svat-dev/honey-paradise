import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import type { EnumNotificationType } from "@prisma/client";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { getPagination } from "src/shared/lib/common/utils/get-pagination.util";
import { notificationUserOutput } from "src/shared/lib/prisma/outputs/notifications.output";
import { NotificationGateway } from "../../shared/websockets/notifications.gateway";
import { ProfileService } from "../auth/profile/profile.service";
import type { GetAllQueryDto } from "./dto/get-all.dto";

@Injectable()
export class NotificationsService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly profileService: ProfileService,
		private readonly socket: NotificationGateway,
		private readonly i18n: I18nService
	) {}

	async getAllByUser(userId: string, query: GetAllQueryDto) {
		const user = await this.profileService.getProfile(userId, "id");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

		const { is_read, sort, type } = query;
		const { perPage, skip } = getPagination(query.page, query.per_page);

		const notifications = await this.prisma.notification.findMany({
			where: { userId: user.id },
			orderBy: { createdAt: "desc" },
			select: notificationUserOutput,
			skip,
			take: perPage,
		});

		const length = await this.prisma.notification.count({ where: { userId: user.id } });
		const unReadLength = await this.prisma.notification.count({ where: { userId: user.id, isRead: false } });

		return { notifications, length, unReadLength };
	}

	async send(userId: string, msg: string, type: EnumNotificationType) {
		const user = await this.profileService.getProfile(userId, "id");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

		const { id } = await this.prisma.notification.create({
			data: {
				message: msg,
				type,
				userId: user.id,
			},
			select: { id: true },
		});

		this.socket.handleNewNotification({ userId: user.id, message: "notifications/refresh", nid: id });

		return true;
	}

	async markAsRead(id: string[]) {
		const notification = await this.prisma.notification.findMany({ where: { id: { in: id } } });

		if (notification.length <= 0) throw new NotFoundException(this.i18n.t("d.errors.notifications.not_found"));

		for (const item of notification) {
			await this.prisma.notification.update({ where: { id: item.id }, data: { isRead: true } });
		}

		return true;
	}

	async delete(id: string) {
		const notification = await this.prisma.notification.findUnique({ where: { id } });

		if (!notification) throw new NotFoundException(this.i18n.t("d.errors.notifications.not_found"));

		await this.prisma.notification.delete({ where: { id: notification.id } });

		return true;
	}
}
