import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import Redis from "ioredis"
import { ms } from "src/shared/lib/common/utils"
import type {
	IRedisSession,
	ITranslateCacheData
} from "src/shared/types/redis-values.type"
import type { ISession } from "src/shared/types/session-metadata.type"

@Injectable()
export class RedisService extends Redis {
	constructor(private readonly configService: ConfigService) {
		super(configService.getOrThrow<string>("REDIS_URI"))
	}

	sessionFolder = this.configService.get<string>("SESSION_FOLDER")
	translateFolder = this.configService.get<string>("TRANSLATE_FOLDER")

	async getSession(id: string): Promise<ISession> {
		const sessionData = await this.get(this.sessionFolder + id)
		const session: IRedisSession = JSON.parse(sessionData || '{"id":"null"}')

		if (session.id === "null") throw new NotFoundException("Session not found")

		const { cookie, ...other } = session

		return other
	}

	async deleteSession(id: string | string[]): Promise<boolean> {
		try {
			if (Array.isArray(id)) {
				await Promise.all(id.map(id => this.del(this.sessionFolder + id)))
			} else {
				await this.del(this.sessionFolder + id)
			}

			return true
		} catch (error) {
			throw new InternalServerErrorException(`Failed to delete session: ${id}`)
		}
	}

	async getTranslateCache(
		id: string,
		locale: string
	): Promise<ITranslateCacheData> {
		const translateData = await this.get(
			this.translateFolder + `${locale}:` + id
		)
		const translate = JSON.parse(translateData || "{}")

		return translate
	}

	async createTranslateCache(
		id: string,
		locale: string,
		data: ITranslateCacheData
	): Promise<boolean> {
		await this.set(
			this.translateFolder + `${locale}:` + id,
			JSON.stringify(data),
			"EX",
			ms("24h") / 1000
		)

		return true
	}

	async getDataByFolder<T = any>(folder: string): Promise<T[]> {
		const result = []
		let cursor = "0"

		do {
			const data = await this.scan(cursor, "MATCH", `${folder}*`)

			cursor = data[0]
			const keys = data[1]

			if (keys.length > 0) {
				const values = await Promise.all(keys.map(key => this.get(key)))

				result.push(
					...values.map((value, index) => {
						const { cookie, ...other } = JSON.parse(value)
						const keyParts = keys[index].split(":")
						const id = keyParts[keyParts.length - 1]

						return {
							id,
							...other
						}
					})
				)
			}
		} while (cursor !== "0")

		return result
	}
}
