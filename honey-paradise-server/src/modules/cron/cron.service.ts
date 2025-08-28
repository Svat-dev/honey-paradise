import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { Cron } from "@nestjs/schedule/dist/decorators/cron.decorator";
import { PrismaService } from "src/core/prisma/prisma.service";
import { ms } from "src/shared/lib/common/utils";

@Injectable()
export class CronService {
	constructor(private readonly prisma: PrismaService) {}

	@Cron("0 0 0 * * 1", { timeZone: "UTC" })
	async manageExpiredNotifications() {
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
}
