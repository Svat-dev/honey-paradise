import { MailerOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-options.interface";
import { ConfigService } from "@nestjs/config/dist/config.service";

export const getMailConfig = async (configService: ConfigService): Promise<MailerOptions> => {
	const transport = configService.getOrThrow<string>("MAIL_TRANSPORT");
	const mailFromName = configService.getOrThrow<string>("MAIL_FROM_NAME");
	const mailFromAddress = transport.split(":")[1].split("//")[1];

	return {
		transport,
		defaults: {
			from: `"${mailFromName}" <${mailFromAddress}>`,
		},
	};
};
