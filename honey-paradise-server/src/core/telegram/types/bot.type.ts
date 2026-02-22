import type { Context } from "telegraf"

export interface ITelegramSessionData {
	jwt_token?: string
}

export interface IBotContext extends Context {
	session: ITelegramSessionData
	match?: RegExpExecArray
}
