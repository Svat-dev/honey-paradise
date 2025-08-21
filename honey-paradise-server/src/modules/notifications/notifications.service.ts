import { EnumNotificationType, type Notification, type Prisma } from "@prisma/client";

import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ms } from "src/shared/lib/common/utils";
import { getPagination } from "src/shared/lib/common/utils/get-pagination.util";
import { notificationUserOutput } from "src/shared/lib/prisma/outputs/notifications.output";
import { NotificationGateway } from "../../shared/websockets/notifications.gateway";
import { ProfileService } from "../auth/profile/profile.service";
import { EnumNotificationsSort, type GetAllQueryDto } from "./dto/get-all.dto";
import type { UpdateNotificationsSettingsDto } from "./dto/update-notifications-settings.dto";

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

		const { perPage, skip } = getPagination(query.page, query.per_page);
		const filters = this.getFilters(query);

		const notifications = await this.prisma.notification.findMany({
			where: { userId: user.id, ...filters },
			orderBy: { createdAt: query.sort === EnumNotificationsSort.NEWEST ? "desc" : "asc" },
			select: notificationUserOutput,
			skip,
			take: perPage,
		});

		const length = await this.prisma.notification.count({ where: { userId: user.id, ...filters } });
		const unReadLength = await this.prisma.notification.count({ where: { userId: user.id, isRead: false, archivedAt: null } });

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

		this.socket.handleNewNotification({ userId: user.id, nid: id });

		return true;
	}

	async markAsRead(userId: string, ids: string[]) {
		const notifications = await this.getAllNotificationsByIds(ids);

		for (const { id, isRead } of notifications) {
			if (isRead) throw new ConflictException(this.i18n.t("d.errors.notifications.already_read"));

			await this.prisma.notification.update({ where: { id }, data: { isRead: true } });
		}

		this.socket.handleRefreshNotifications({ userId });

		return true;
	}

	async markAsReadAll(userId: string) {
		const notifications = await this.prisma.notification.findMany({ where: { userId } });

		for (const { id, isRead } of notifications) {
			if (!isRead) await this.prisma.notification.update({ where: { id }, data: { isRead: true } });
		}

		this.socket.handleRefreshNotifications({ userId });

		return true;
	}

	async markAsArchived(userId: string, ids: string[]) {
		const notifications = await this.getAllNotificationsByIds(ids);

		for (const { id, isRead, archivedAt } of notifications) {
			if (!isRead) throw new ConflictException(this.i18n.t("d.errors.notifications.not_read_to_archive"));
			if (archivedAt) throw new ConflictException(this.i18n.t("d.errors.notifications.already_archived"));

			await this.prisma.notification.update({ where: { id }, data: { archivedAt: new Date() } });
		}

		this.socket.handleRefreshNotifications({ userId });

		return true;
	}

	async delete(userId: string, ids: string[]) {
		const notifications = await this.getAllNotificationsByIds(ids);

		for (const { id } of notifications) {
			await this.prisma.notification.delete({ where: { id } });
		}

		this.socket.handleRefreshNotifications({ userId });

		return true;
	}

	async updateSettings(userId: string, dto: UpdateNotificationsSettingsDto) {
		const user = await this.profileService.getProfile(userId, "id");

		if (!user) throw new NotFoundException(this.i18n.t("d.errors.profile.not_found"));

		if (typeof dto.enabled === "boolean" && dto.enabled === false) {
			await this.prisma.notificationSettings.update({
				where: { userId: user.id },
				data: { ...dto, enabled: false, withSound: false },
			});
		} else await this.prisma.notificationSettings.update({ where: { userId: user.id }, data: dto });

		return true;
	}

	async checkExpiredNotifications() {
		const readNotifications = await this.prisma.notification.findMany({ where: { isRead: true } });

		for (const { id, archivedAt, updatedAt } of readNotifications) {
			if (archivedAt) {
				const diff = new Date().getTime() - archivedAt.getTime();
				if (diff > ms("12w")) await this.prisma.notification.delete({ where: { id } });
				else continue;
			} else {
				const diff = new Date().getTime() - updatedAt.getTime();
				if (diff > ms("12w")) await this.prisma.notification.update({ where: { id }, data: { archivedAt: new Date() } });
				continue;
			}
		}

		return true;
	}

	private async getAllNotificationsByIds(ids: string[]): Promise<Notification[]> {
		const notifications = await this.prisma.notification.findMany({ where: { id: { in: ids } } });

		if (notifications.length <= 0) throw new NotFoundException(this.i18n.t("d.errors.notifications.not_found"));

		return notifications;
	}

	private getFilters(query: GetAllQueryDto): Prisma.NotificationWhereInput {
		const { is_read, types } = query;

		return {
			archivedAt: null,
			...(types && types.split(",").length > 0 && { type: { in: types.split(",") as any } }),
			...(is_read && { isRead: is_read === "true" ? false : undefined }),
		};
	}
}
