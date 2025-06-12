import { MailerService } from "@nestjs-modules/mailer/dist/mailer.service";
import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator";
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception";
import { ConfigService } from "@nestjs/config/dist/config.service";

@Injectable()
export class MailService {
	constructor(private readonly mailer: MailerService, private readonly config: ConfigService) {}

	async sendConfirmationMail(email: string, token: string) {
		const html = ``;

		return this.sendMail(html, "Welcome!", email);
	}

	private async sendMail(html: string, subject: string, email: string) {
		try {
			await this.mailer.sendMail({
				html,
				subject,
				to: email,
			});
		} catch (error) {
			throw new InternalServerErrorException(error);
		}
	}
}
