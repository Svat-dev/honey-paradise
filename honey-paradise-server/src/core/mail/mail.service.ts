import { MailerService } from "@nestjs-modules/mailer/dist/mailer.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { render } from "@react-email/components";
import { I18nService } from "nestjs-i18n/dist/services/i18n.service";
import { EmailConfirmationTemplate } from "src/shared/lib/mail/EmailConfirmationTemplate";

@Injectable()
export class MailService {
	constructor(
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
