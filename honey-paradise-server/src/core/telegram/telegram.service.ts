import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import type { OnModuleInit } from "@nestjs/common/interfaces/hooks/on-init.interface"
import { Logger } from "@nestjs/common/services/logger.service"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { EnumTokenTypes } from "@prisma/client"
import { I18nService } from "nestjs-i18n/dist/services/i18n.service"
import * as BotApi from "node-telegram-bot-api"
import type {
	CallbackQuery,
	InlineKeyboardButton,
	Message
} from "node-telegram-bot-api"
import { ProfileService } from "src/modules/auth/profile/profile.service"
import { VerificationService } from "src/modules/auth/verification/verification.service"
import { isDev } from "src/shared/lib/common/utils"
import { capitalize } from "src/shared/lib/common/utils/capitalize.util"
import { isOffline } from "src/shared/lib/common/utils/is-offline.util"
import { EnumClientRoutes } from "src/shared/types/client/enums.type"
import type { SessionMetadata } from "src/shared/types/session-metadata.type"
import { SessionsGateway } from "src/shared/websockets/sessions.gateway"

import { PrismaService } from "../prisma/prisma.service"

import { BotCallbacks } from "./data/callbacks"
import { BotCommands, getCommandList } from "./data/commands"

@Injectable()
export class TelegramService implements OnModuleInit {
	private readonly logger = new Logger("Telegram Service")

	private readonly bot: BotApi
	private readonly clientUrl: string

	constructor(
		private readonly config: ConfigService,
		private readonly prisma: PrismaService,
		private readonly i18n: I18nService,
		private readonly sessionsSocket: SessionsGateway,
		private readonly profileService: ProfileService,
		private readonly verificationService: VerificationService
	) {
		if (isOffline(this.config))
			throw new InternalServerErrorException("Offline mode")

		this.bot = new BotApi(
			this.config.getOrThrow<string>("TELEGRAM_BOT_TOKEN"),
			{ polling: true }
		)
		this.clientUrl = !isDev(this.config)
			? "https://www.google.com"
			: this.config.getOrThrow<string>("CLIENT_URL")
	}

	async onModuleInit() {
		await this.setBotConfig(false)

		this.bot.on("text", async msg => {
			if (msg.text.startsWith(BotCommands.START)) return await this.start(msg)
			if (msg.text === BotCommands.HELP) return await this.help(msg)
			if (msg.text === BotCommands.ME) return await this.onMe(msg)
			if (msg.text === BotCommands.DISCONNECT)
				return await this.onDisconnect(msg)
			if (msg.text === BotCommands.INFO) return await this.info(msg)

			return await this.onUndefinedText(msg)
		})

		this.bot.on("callback_query", async query => {
			if (query.data === BotCallbacks.DISCONNECT)
				return await this.onDisconnectCb(query)
			if (query.data.startsWith(BotCallbacks.READ_NOTIFICATION))
				return await this.onReadNotificationCb(query)

			if (query.data.startsWith(BotCallbacks.ACCEPT_AUTH))
				return await this.onAuthConfirmCb(query)
			if (query.data.startsWith(BotCallbacks.REJECT_AUTH))
				return await this.onAuthRejectCb(query)

			if (
				query.data === BotCallbacks.DISCONNECT_YES ||
				query.data === BotCallbacks.DISCONNECT_NO
			)
				return await this.onCompleteDisconnectCb(query)
		})

		this.logger.log("Telegram bot successfully initialized")
	}

	private async setBotConfig(auth: boolean) {
		const commands = getCommandList(auth)

		await this.bot.setMyCommands(commands.ru, { language_code: "ru" })
		await this.bot.setMyCommands(commands.en, { language_code: "en" })

		return true
	}

	private async start(msg: Message) {
		const chatId = msg.chat.id
		const tgUsername = msg.from.username

		const token = msg.text.split(" ")[1]
		const url = this.clientUrl + EnumClientRoutes.SETTINGS

		if (token) {
			try {
				await this.verificationService.verifyTelegramConnectToken(token, chatId)

				await this.bot.sendMessage(
					chatId,
					this.i18n.t("d.tg-bot.toasters.success.connected"),
					{
						reply_markup: {
							resize_keyboard: true,
							inline_keyboard: [
								[
									{
										text: this.i18n.t("d.tg-bot.inline_buttons.to_settings"),
										url
									}
								],
								[
									{
										text: this.i18n.t("d.tg-bot.inline_buttons.to_website"),
										url: this.clientUrl
									}
								]
							]
						}
					}
				)
			} catch (error) {
				const errorMsg = error?.response?.message?.replace("\n", " ") || null
				const url = this.clientUrl + EnumClientRoutes.SETTINGS
				const inline_keyboard: InlineKeyboardButton[][] = [
					[{ text: this.i18n.t("d.tg-bot.get_new_link"), url }]
				]

				if (errorMsg) {
					await this.bot.sendMessage(
						chatId,
						this.i18n.t("d.tg-bot.toasters.error.not_linked")
					)
					await this.bot.sendMessage(chatId, errorMsg, {
						reply_markup: { inline_keyboard }
					})
				} else
					await this.bot.sendMessage(
						chatId,
						this.i18n.t("d.tg-bot.toasters.error.not_linked"),
						{ reply_markup: { inline_keyboard } }
					)

				return false
			}
		} else {
			const profile = await this.profileService.getProfile(
				String(chatId),
				"tg-id"
			)

			if (profile) return await this.onMe(msg)
			else
				await this.bot.sendMessage(
					chatId,
					this.i18n.t("d.tg-bot.msgs.welcome", {
						args: { username: tgUsername, link: this.clientUrl }
					}),
					{
						parse_mode: "HTML",
						reply_markup: {
							inline_keyboard: [
								[
									{
										text: this.i18n.t("d.tg-bot.inline_buttons.to_settings"),
										url
									}
								]
							]
						}
					}
				)
		}

		return true
	}

	private async help(msg: Message) {
		const chatId = msg.chat.id

		const user = await this.profileService.getProfile(String(chatId), "tg-id")

		const commands = getCommandList(!!user)
		const lang = msg.from.language_code

		const helpMessage =
			this.i18n.t("d.tg-bot.msgs.help", { lang }) +
			commands.ru
				.map(val => `\n${val.command} → <i>${val.description}</i>`)
				.join("")

		await this.bot.sendMessage(chatId, helpMessage, { parse_mode: "HTML" })

		return true
	}

	private async info(msg: Message) {
		const chatId = msg.chat.id
		const lang = msg.from.language_code

		const text = this.i18n.t("d.tg-bot.msgs.info", {
			lang,
			args: { link: this.clientUrl }
		})

		await this.bot.sendMessage(chatId, text, { parse_mode: "HTML" })

		return true
	}

	private async onMe(msg: Message) {
		const chatId = msg.chat.id
		const lang = msg.from.language_code

		const user = await this.profileService.getProfile(String(chatId), "tg-id")
		if (!user)
			return await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_registered", { lang })
			)

		const url = this.clientUrl + EnumClientRoutes.SETTINGS

		await this.bot.sendMessage(
			chatId,
			this.i18n.t("d.tg-bot.msgs.me", {
				lang,
				args: {
					username: user.username,
					email: user.email,
					phone:
						user.phoneNumber ||
						this.i18n.t("d.tg-bot.msgs.not_phone_selected", { lang })
				}
			}),
			{
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: this.i18n.t("d.tg-bot.inline_buttons.to_settings", {
									lang
								}),
								url
							}
						]
					]
				}
			}
		)

		return true
	}

	private async onDisconnect(msg: Message) {
		const chatId = msg.chat.id
		const lang = msg.from.language_code

		const user = await this.profileService.getProfile(String(chatId), "tg-id")
		if (!user)
			return await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_registered_to_unlink", {
					lang
				})
			)

		const url = this.clientUrl + EnumClientRoutes.SETTINGS

		await this.bot.sendMessage(
			chatId,
			this.i18n.t("d.tg-bot.msgs.disconnect", { lang }),
			{
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: this.i18n.t(
									"d.tg-bot.inline_buttons.continue_at_website",
									{ lang }
								),
								url
							}
						],
						[
							{
								text: this.i18n.t("d.tg-bot.inline_buttons.continue_here", {
									lang
								}),
								callback_data: BotCallbacks.DISCONNECT
							}
						]
					],
					resize_keyboard: true
				}
			}
		)
	}

	private async onDisconnectCb(query: CallbackQuery) {
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.message.from.language_code

		const user = await this.profileService.getProfile(String(chatId), "tg-id")
		if (!user)
			return await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_registered_to_unlink", {
					lang
				})
			)

		await this.bot.deleteMessage(chatId, msgId)
		await this.bot.sendMessage(
			chatId,
			this.i18n.t("d.tg-bot.msgs.disconnect_cb", { lang }),
			{
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: this.i18n.t("d.tg-bot.inline_buttons.yes", { lang }),
								callback_data: BotCallbacks.DISCONNECT_YES
							},
							{
								text: this.i18n.t("d.tg-bot.inline_buttons.no", { lang }),
								callback_data: BotCallbacks.DISCONNECT_NO
							}
						]
					]
				}
			}
		)

		return true
	}

	private async onCompleteDisconnectCb(query: CallbackQuery) {
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.message.from.language_code
		const result = query.data as
			| (typeof BotCallbacks)["DISCONNECT_NO"]
			| (typeof BotCallbacks)["DISCONNECT_YES"]

		const user = await this.profileService.getProfile(String(chatId), "tg-id")
		if (!user)
			return await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_registered_to_unlink", {
					lang
				})
			)

		if (result === "disconnect_callback_no") {
			await this.bot.deleteMessage(chatId, msgId)
			await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.success.disconnect_no", { lang })
			)
		} else {
			try {
				await this.profileService.updateProfile(user.id, { telegramId: null })

				await this.prisma.notificationSettings.update({
					data: {
						siteNotificationsType: true,
						telegramNotificationsType: false
					},
					where: { userId: user.id }
				})

				await this.bot.deleteMessage(chatId, msgId)
				await this.bot.sendMessage(
					chatId,
					this.i18n.t("d.tg-bot.toasters.success.disconnect_yes", { lang })
				)
			} catch (error) {
				const errorMsg = error?.response?.message?.replace("\n", " ") || null

				await this.bot.deleteMessage(chatId, msgId)
				await this.bot.sendMessage(
					chatId,
					this.i18n.t("d.tg-bot.errors.not_unlinked", { lang })
				)
				if (errorMsg) await this.bot.sendMessage(chatId, errorMsg)

				return false
			}
		}

		return true
	}

	private async onReadNotificationCb(query: CallbackQuery) {
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.message.from.language_code
		const nid = query.data.split(":")[1] as string

		const user = await this.profileService.getProfile(String(chatId), "tg-id")
		if (!user)
			return await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_registered", { lang })
			)

		const notification = await this.prisma.notification.findUnique({
			where: { id: nid },
			select: { id: true }
		})
		if (!notification)
			return await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_read", { lang })
			)

		await this.prisma.notification.update({
			data: { isRead: true },
			where: { id: notification.id }
		})

		await this.bot.deleteMessage(chatId, msgId)
		await this.bot.sendMessage(
			chatId,
			this.i18n.t("d.tg-bot.toasters.success.marked_as_read", { lang })
		)

		return true
	}

	private async onAuthRejectCb(query: CallbackQuery) {
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.message.from.language_code
		const room = query.data.split(":")[1] as string

		try {
			this.sessionsSocket.handleRejectTgLogin({ room })

			await this.bot.deleteMessage(chatId, msgId)
			await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.success.auth_rejected", { lang })
			)
		} catch (error) {
			const errorMsg = error?.response?.message?.replace("\n", " ") || null

			await this.bot.deleteMessage(chatId, msgId)
			await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.500", { lang })
			)
			if (errorMsg) await this.bot.sendMessage(chatId, errorMsg)

			return false
		}

		return true
	}

	private async onAuthConfirmCb(query: CallbackQuery) {
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.message.from.language_code

		const token = query.data.split(":")[1] as string
		const room = query.data.split(":")[2] as string

		const existingToken = this.prisma.token.findFirst({
			where: { token, type: EnumTokenTypes.TELEGRAM_TFA_AUTH }
		})
		if (!existingToken)
			return await this.bot.sendMessage(
				chatId,
				"Токен устарел или отсутствует, запросите новый"
			) //TODO translate

		try {
			this.sessionsSocket.handleAcceptTgLogin({ token, room })

			await this.bot.deleteMessage(chatId, msgId)
			await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.success.auth_accepted", { lang })
			)
		} catch (error) {
			const errorMsg = error?.response?.message?.replace("\n", " ") || null

			await this.bot.deleteMessage(chatId, msgId)
			await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.500", { lang })
			)
			if (errorMsg) await this.bot.sendMessage(chatId, errorMsg)

			return false
		}

		return true
	} //TODO брать язык юзера

	private async onUndefinedText(msg: Message) {
		const chatId = msg.chat.id
		const lang = msg.from.language_code

		await this.bot.sendMessage(
			chatId,
			this.i18n.t("d.tg-bot.toasters.error.undefined", { lang })
		)

		await this.help(msg)

		return true
	}

	async sendTelegramNotification(chatId: number, nid: string, text: string) {
		try {
			const url = this.clientUrl + EnumClientRoutes.NOTIFICATIONS
			const callback_data = BotCallbacks.READ_NOTIFICATION + ":" + nid

			await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.msgs.new_notification")
			)
			await this.bot.sendMessage(chatId, text, {
				reply_markup: {
					inline_keyboard: [
						[{ text: this.i18n.t("d.tg-bot.inline_buttons.view"), url }],
						[
							{
								text: this.i18n.t("d.tg-bot.inline_buttons.mark_as_read"),
								callback_data
							}
						]
					]
				}
			})

			return true
		} catch (error) {
			throw new InternalServerErrorException(
				this.i18n.t("d.errors.500.default")
			)
		}
	}

	async sendTFAuthCode(chatId: number, code: string) {
		try {
			await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.msgs.2fa_code", { args: { code } }),
				{ parse_mode: "HTML" }
			)

			return true
		} catch (error) {
			throw new InternalServerErrorException(
				this.i18n.t("d.errors.500.default")
			)
		}
	}

	async sendEmailConfirmationCode(chatId: number, code: string) {
		try {
			await this.bot.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.msgs.email_confirm_code", { args: { code } }),
				{ parse_mode: "HTML" }
			)

			return true
		} catch (error) {
			throw new InternalServerErrorException(
				this.i18n.t("d.errors.500.default")
			)
		}
	}

	async sendConfirmAuth(
		chatId: number,
		metadata: SessionMetadata,
		date: string
	) {
		try {
			const text = this.i18n.t("d.tg-bot.msgs.confirm_auth", {
				args: {
					device: `${capitalize(metadata.device.browser)}, ${capitalize(metadata.device.os)}`,
					location: `${capitalize(metadata.location.country)}, ${capitalize(metadata.location.city)}`,
					ip: metadata.ip,
					date
				}
			})

			const token = await this.verificationService.sendTelegramAuthToken(chatId)
			const socket_room = new Date().getTime()

			await this.bot.sendMessage(chatId, text, {
				parse_mode: "HTML",
				reply_markup: {
					inline_keyboard: [
						[
							{
								text: this.i18n.t("d.tg-bot.inline_buttons.confirm"),
								callback_data:
									BotCallbacks.ACCEPT_AUTH + ":" + token + ":" + socket_room
							}
						],
						[
							{
								text: this.i18n.t("d.tg-bot.inline_buttons.reject"),
								callback_data: BotCallbacks.REJECT_AUTH + ":" + socket_room
							}
						]
					]
				}
			})

			return { room: socket_room, token }
		} catch (error) {
			throw new InternalServerErrorException(
				this.i18n.t("d.errors.500.default")
			)
		}
	}

	async sendCancelAuth(tgId: string, room: string) {
		if (isNaN(Number(tgId)))
			throw new BadRequestException("Invalid telegram chat id!")

		const chatId = Number(tgId)

		await this.bot.sendMessage(
			chatId,
			"❌ Авторизация была отменена инициатором!"
		)

		this.sessionsSocket.handleDisconnectRoom(room)

		return true
	}

	async sendTelegramAuthCodeExpired(chatId: number) {
		const chat = await this.bot.getChat(chatId)
		if (!chat)
			throw new NotFoundException(
				this.i18n.t("d.errors.account.not_found_chat_id")
			)

		await this.bot.sendMessage(
			chatId,
			"⏳ Ваше время подтверждения закончилось!"
		)

		return true
	}

	async getTgUsername(chatId: number) {
		const chat = await this.bot.getChat(chatId)

		if (!chat)
			throw new NotFoundException(
				this.i18n.t("d.errors.account.not_found_chat_id")
			)

		return {
			username: chat.username,
			first_name: chat.first_name,
			last_name: chat.last_name
		}
	}
}
