import type { ISession } from "./session-metadata.type"

export interface IRedisSession extends ISession {
	cookie: any
}

export interface ITranslateCacheData {
	text: string
	languageCode: string
}

export type TTranslateCache = Record<
	"en" | "ru",
	Record<string, ITranslateCacheData>
>

export type TRedisBans = Record<string, IRedisBanData[]>

export interface IRedisBanData {
	tgId: number
	reason: string
	streak: number
	ttl: number
}
