import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { BadRequestException } from "@nestjs/common/exceptions/bad-request.exception"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import type {
	OnModuleDestroy,
	OnModuleInit
} from "@nestjs/common/interfaces/hooks"
import { Logger } from "@nestjs/common/services/logger.service"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { EnumTokenTypes } from "@prisma/client"
import { I18nService } from "nestjs-i18n/dist/services/i18n.service"
import { ProfileService } from "src/modules/auth/profile/profile.service"
import { VerificationService } from "src/modules/auth/verification/verification.service"
import { isDev } from "src/shared/lib/common/utils"
import { capitalize } from "src/shared/lib/common/utils/capitalize.util"
import { isOffline } from "src/shared/lib/common/utils/is-offline.util"
import { EnumClientRoutes } from "src/shared/types/client/enums.type"
import type { SessionMetadata } from "src/shared/types/session-metadata.type"
import { SessionsGateway } from "src/shared/websockets/sessions.gateway"
import { session, Telegraf } from "telegraf"
import { callbackQuery, message } from "telegraf/filters"
import type { KeyedDistinct } from "telegraf/typings/core/helpers/util"
import type {
	CallbackQuery,
	InlineKeyboardButton
} from "telegraf/typings/core/types/typegram"

import { PrismaService } from "../prisma/prisma.service"
import { RedisService } from "../redis/redis.service"

import { BotCallbacks } from "./data/callbacks"
import { BotCommands, getCommandList } from "./data/commands"
import type { IBotContext } from "./types/bot.type"

type TCallbackQuery = KeyedDistinct<CallbackQuery, "data">

@Injectable()
export class TelegramService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger("Telegram Service")

	private readonly bot: Telegraf<IBotContext>
	private readonly clientUrl: string

	constructor(
		private readonly config: ConfigService,
		private readonly prisma: PrismaService,
		private readonly redisService: RedisService,
		private readonly i18n: I18nService,
		private readonly sessionsSocket: SessionsGateway,
		private readonly profileService: ProfileService,
		private readonly verificationService: VerificationService
	) {
		if (isOffline(this.config))
			throw new InternalServerErrorException("Offline mode")

		this.bot = new Telegraf<IBotContext>(
			this.config.getOrThrow<string>("TELEGRAM_BOT_TOKEN")
		)
		)

		this.clientUrl = !isDev(this.config)
			? "https://www.google.com"
			: this.config.getOrThrow<string>("CLIENT_URL")
	}

	// Config
	async onModuleInit() {
		// if (true) return "Offline mode"

		await this.setBotConfig(false)

		this.bot.start(ctx => this.start(ctx))
		this.bot.help(ctx => this.help(ctx))

		this.bot.command(BotCommands.ME, ctx => this.onMe(ctx))
		this.bot.command(BotCommands.DISCONNECT, ctx => this.onDisconnect(ctx))
		this.bot.command(BotCommands.INFO, ctx => this.info(ctx))

		this.bot.on(message("text"), async ctx => {
			if (!ctx.text.startsWith("/")) return await this.onUndefinedText(ctx)
		})

		this.bot.on(callbackQuery("data"), async ctx => {
			const query = ctx.callbackQuery

			if (query.data === BotCallbacks.DISCONNECT)
				return await this.onDisconnectCb(query)
			if (query.data.startsWith(BotCallbacks.READ_NOTIFICATION))
				return await this.onReadNotificationCb(query)

			if (query.data.startsWith(BotCallbacks.ACCEPT_AUTH))
				return await this.onAuthConfirmCb(ctx)
			if (query.data.startsWith(BotCallbacks.REJECT_AUTH))
				return await this.onAuthRejectCb(ctx)

			if (
				query.data === BotCallbacks.DISCONNECT_YES ||
				query.data === BotCallbacks.DISCONNECT_NO
			)
				return await this.onCompleteDisconnectCb(query)
		})

		this.bot.launch()

		this.logger.log("Telegram bot successfully initialized")
	}

	private async setBotConfig(auth: boolean) {
		const commands = getCommandList(auth)

		await this.bot.telegram.setMyCommands(commands.ru, { language_code: "ru" })
		await this.bot.telegram.setMyCommands(commands.en, { language_code: "en" })

		return true
	}

	// Commands
	private async start(ctx: IBotContext) {
		const msg = ctx.message
		const chatId = msg.chat.id
		const tgUsername = msg.from.username

		const token = ctx.text.split(" ")[1]
		const url = this.clientUrl + EnumClientRoutes.SETTINGS

		if (token) {
			try {
				await this.verificationService.verifyTelegramConnectToken(token, chatId)

				await ctx.sendMessage(
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
					await ctx.sendMessage(
						this.i18n.t("d.tg-bot.toasters.error.not_linked")
					)
					await ctx.sendMessage(errorMsg, {
						reply_markup: { inline_keyboard }
					})
				} else
					await ctx.sendMessage(
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

			if (profile) return await this.onMe(ctx)
			else
				await ctx.sendMessage(
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

	private async help(ctx: IBotContext) {
		const msg = ctx.message
		const chatId = msg.chat.id

		const user = await this.profileService.getProfile(String(chatId), "tg-id")

		const commands = getCommandList(!!user)
		const lang = msg.from.language_code

		const helpMessage =
			this.i18n.t("d.tg-bot.msgs.help", { lang }) +
			commands.ru
				.map(val => `\n${val.command} → <i>${val.description}</i>`)
				.join("")

		await ctx.sendMessage(helpMessage, { parse_mode: "HTML" })

		return true
	}

	private async info(ctx: IBotContext) {
		const lang = ctx.message.from.language_code

		const text = this.i18n.t("d.tg-bot.msgs.info", {
			lang,
			args: { link: this.clientUrl }
		})

		await ctx.sendMessage(text, { parse_mode: "HTML" })

		return true
	}

	private async onMe(ctx: IBotContext) {
		const msg = ctx.message
		const lang = msg.from.language_code

		const user = await this.profileService.getProfile(
			String(msg.chat.id),
			"tg-id"
		)

		if (!user)
			return await ctx.sendMessage(
				this.i18n.t("d.tg-bot.toasters.error.not_registered", { lang })
			)

		const url = this.clientUrl + EnumClientRoutes.SETTINGS

		await ctx.sendMessage(
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

	private async onDisconnect(ctx: IBotContext) {
		const msg = ctx.message
		const lang = msg.from.language_code

		const user = await this.profileService.getProfile(
			String(msg.chat.id),
			"tg-id"
		)
		if (!user)
			return await ctx.sendMessage(
				this.i18n.t("d.tg-bot.toasters.error.not_registered_to_unlink", {
					lang
				})
			)

		const url = this.clientUrl + EnumClientRoutes.SETTINGS

		await ctx.sendMessage(this.i18n.t("d.tg-bot.msgs.disconnect", { lang }), {
			reply_markup: {
				inline_keyboard: [
					[
						{
							text: this.i18n.t("d.tg-bot.inline_buttons.continue_at_website", {
								lang
							}),
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
		})
	}

	private async onUndefinedText(ctx: IBotContext) {
		const lang = ctx.message.from.language_code

		await ctx.sendMessage(
			this.i18n.t("d.tg-bot.toasters.error.undefined", { lang })
		)

		await this.help(ctx)

		return true
	}

	// Callbacks
	private async onDisconnectCb(query: TCallbackQuery) {
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.from.language_code

		const user = await this.profileService.getProfile(String(chatId), "tg-id")
		if (!user)
			return await this.bot.telegram.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_registered_to_unlink", {
					lang
				})
			)

		await this.bot.telegram.deleteMessage(chatId, msgId)
		await this.bot.telegram.sendMessage(
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

	private async onCompleteDisconnectCb(query: TCallbackQuery) {
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.from.language_code
		const result = query.data as
			| (typeof BotCallbacks)["DISCONNECT_NO"]
			| (typeof BotCallbacks)["DISCONNECT_YES"]

		const user = await this.profileService.getProfile(String(chatId), "tg-id")
		if (!user)
			return await this.bot.telegram.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_registered_to_unlink", {
					lang
				})
			)

		if (result === "disconnect_callback_no") {
			await this.bot.telegram.deleteMessage(chatId, msgId)
			await this.bot.telegram.sendMessage(
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

				await this.bot.telegram.deleteMessage(chatId, msgId)
				await this.bot.telegram.sendMessage(
					chatId,
					this.i18n.t("d.tg-bot.toasters.success.disconnect_yes", { lang })
				)
			} catch (error) {
				const errorMsg = error?.response?.message?.replace("\n", " ") || null

				await this.bot.telegram.deleteMessage(chatId, msgId)
				await this.bot.telegram.sendMessage(
					chatId,
					this.i18n.t("d.tg-bot.errors.not_unlinked", { lang })
				)
				if (errorMsg) await this.bot.telegram.sendMessage(chatId, errorMsg)

				return false
			}
		}

		return true
	}

	private async onReadNotificationCb(query: TCallbackQuery) {
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.from.language_code
		const nid = query.data.split(":")[1] as string

		const user = await this.profileService.getProfile(String(chatId), "tg-id")
		if (!user)
			return await this.bot.telegram.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_registered", { lang })
			)

		const notification = await this.prisma.notification.findUnique({
			where: { id: nid },
			select: { id: true }
		})
		if (!notification)
			return await this.bot.telegram.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.not_read", { lang })
			)

		await this.prisma.notification.update({
			data: { isRead: true },
			where: { id: notification.id }
		})

		await this.bot.telegram.deleteMessage(chatId, msgId)
		await this.bot.telegram.sendMessage(
			chatId,
			this.i18n.t("d.tg-bot.toasters.success.marked_as_read", { lang })
		)

		return true
	}

	private async onAuthRejectCb(ctx: IBotContext) {
		const query = ctx.callbackQuery as TCallbackQuery
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.from.language_code

		try {
			this.sessionsSocket.handleRejectTgLogin({ room })

			await this.bot.telegram.deleteMessage(chatId, msgId)
			await this.bot.telegram.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.success.auth_rejected", { lang })
			)
		} catch (error) {
			const errorMsg = error?.response?.message?.replace("\n", " ") || null

			await this.bot.telegram.deleteMessage(chatId, msgId)
			await this.bot.telegram.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.500", { lang })
			)
			if (errorMsg) await this.bot.telegram.sendMessage(chatId, errorMsg)

			return false
		}

		return true
	}

	private async onAuthConfirmCb(ctx: IBotContext) {
		const query = ctx.callbackQuery as TCallbackQuery
		const chatId = query.message.chat.id
		const msgId = query.message.message_id
		const lang = query.from.language_code

		const token = query.data.split(":")[1] as string
		const room = query.data.split(":")[2] as string

		const existingToken = this.prisma.token.findFirst({
			where: { token, type: EnumTokenTypes.TELEGRAM_TFA_AUTH }
		})
		if (!existingToken)
			return await this.bot.telegram.sendMessage(
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

			await this.bot.telegram.deleteMessage(chatId, msgId)
			await this.bot.telegram.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.toasters.error.500", { lang })
			)
			if (errorMsg) await this.bot.telegram.sendMessage(chatId, errorMsg)

			return false
		}

		return true
	} //TODO брать язык юзера

	// Public methods
	async sendTelegramNotification(chatId: number, nid: string, text: string) {
		try {
			const url = this.clientUrl + EnumClientRoutes.NOTIFICATIONS
			const callback_data = BotCallbacks.READ_NOTIFICATION + ":" + nid

			await this.bot.telegram.sendMessage(
				chatId,
				this.i18n.t("d.tg-bot.msgs.new_notification")
			)
			await this.bot.telegram.sendMessage(chatId, text, {
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
			await this.bot.telegram.sendMessage(
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
			await this.bot.telegram.sendMessage(
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
			const isBanned = await this.redisService.checkIpTgBan(metadata.ip, chatId)

			if (isBanned) {
				await this.bot.sendMessage(chatId, "You are banned!")
				throw new ForbiddenException("Fuck you!")
			}

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

			await this.bot.telegram.sendMessage(chatId, text, {
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

		await this.bot.telegram.sendMessage(
			chatId,
			"❌ Авторизация была отменена инициатором!"
		)

		this.sessionsSocket.handleDisconnectRoom(room)

		return true
	}

	async sendTelegramAuthCodeExpired(chatId: number) {
		const chat = await this.bot.telegram.getChat(chatId)
		if (!chat)
			throw new NotFoundException(
				this.i18n.t("d.errors.account.not_found_chat_id")
			)

		await this.bot.telegram.sendMessage(
			chatId,
			"⏳ Ваше время подтверждения закончилось!"
		)

		return true
	}

	async getTgUsername(chatId: number) {
		const member = await this.bot.telegram.getChatMember(chatId, chatId)

		if (!member)
			throw new NotFoundException(
				this.i18n.t("d.errors.account.not_found_chat_id")
			)

		return {
			username: member.user.username,
			first_name: member.user.first_name,
			last_name: member.user.last_name
		}
	}

	async onModuleDestroy() {
		this.bot.stop()
		this.logger.log("Telegram bot stopped!")
	}
}
