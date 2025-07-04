import { MailerService } from "@nestjs-modules/mailer/dist/mailer.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";
import { render } from "@react-email/components";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { EmailConfirmationTemplate } from "src/shared/lib/mail/EmailConfirmationTemplate";
import { PasswordRecoveryTemplate } from "src/shared/lib/mail/PasswordRecoveryTemplate";
import { EnumClientRoutes } from "src/shared/types/client/enums.type";
import type { SessionMetadata } from "src/shared/types/session-metadata.type";

@Injectable()
export class MailService {
	constructor(
		private readonly config: ConfigService,
		private readonly mailer: MailerService,
		private readonly i18n: I18nService
	) {}

	async sendConfirmationMail(email: string, token: string, username: string) {
		const subject = this.i18n.t("d.emails.confirmation.subject");
		const html = await render(
			await EmailConfirmationTemplate({ t: this.i18n.t("d.emails.confirmation.content", { args: { username } }), token })
		);

		return this.sendMail(html, subject, email);
	}

	async sendPasswordRecoveryMail(email: string, token: string, username: string, metadata: SessionMetadata) {
		const subject = this.i18n.t("d.emails.password_recovery.subject");
		const sender = await this.config.getOrThrow<string>("MAIL_USER");
		const link = `${this.config.getOrThrow<string>("CLIENT_URL")}/${EnumClientRoutes.CHANGE_PASSWORD}&token=${token}`;

		const html = await render(
			await PasswordRecoveryTemplate({ email: sender, link, metadata, t: this.i18n.t("d.emails.password_recovery.content"), username })
		);

		return this.sendMail(html, subject, email);
	}

	private async sendMail(html: string, subject: string, email: string) {
		try {
			await this.mailer.sendMail({
				html,
				subject,
				to: email,
			});
		} catch (error) {
			throw new InternalServerErrorException(this.i18n.t("d.errors.500.cant_send_email"));
		}
	}
}
