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
