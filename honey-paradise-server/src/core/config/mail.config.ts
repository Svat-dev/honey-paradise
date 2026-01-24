import { MailerOptions } from "@nestjs-modules/mailer/dist/interfaces/mailer-options.interface"
import { ConfigService } from "@nestjs/config/dist/config.service"

export const getMailConfig = async (
	config: ConfigService
): Promise<MailerOptions> => {
	const transport = config.getOrThrow<string>("MAIL_TRANSPORT")
	const mailFromName = config.getOrThrow<string>("MAIL_FROM_NAME")
	const mailFromAddress = transport.split(":")[1].split("//")[1]

	return {
		transport,
		defaults: {
			from: `"${mailFromName}" <${mailFromAddress}>`
		}
	}
}
