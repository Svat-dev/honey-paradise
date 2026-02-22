import type { Context } from "telegraf"

export interface IBotContext extends Context {
	match?: RegExpExecArray
}
