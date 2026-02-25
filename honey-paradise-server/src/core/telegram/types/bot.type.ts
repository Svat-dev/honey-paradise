import type { Context } from "telegraf"

export interface ITelegramSessionData {
	jwt_token?: string
	last_auth_msg_id?: number
}

export interface IBotContext extends Context {
	session: ITelegramSessionData
	match?: RegExpExecArray
}
