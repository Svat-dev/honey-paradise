import { Injectable } from "@nestjs/common/decorators/core/injectable.decorator"
import { InternalServerErrorException } from "@nestjs/common/exceptions/internal-server-error.exception"
import { NotFoundException } from "@nestjs/common/exceptions/not-found.exception"
import { ConfigService } from "@nestjs/config/dist/config.service"
import { EnumLanguages } from "@prisma/client"
import Redis, { type RedisKey } from "ioredis"
import { ms } from "src/shared/lib/common/utils"
import type {
	IRedisBanData,
	IRedisSession,
	ITranslateCacheData
} from "src/shared/types/redis-values.type"
import type { ISession } from "src/shared/types/session-metadata.type"

@Injectable()
export class RedisService extends Redis {
	constructor(private readonly configService: ConfigService) {
		super(configService.getOrThrow<string>("REDIS_URI"))
	}

	readonly sessionFolder = this.configService.get<string>("SESSION_FOLDER")
	readonly translateFolder = this.configService.get<string>("TRANSLATE_FOLDER")
	readonly banFolder = this.configService.get<string>("BAN_FOLDER")

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
			ms("7d") / 1000
		)

		return true
	}

	async deleteTranslateCache(id: string): Promise<boolean> {
		const keys: RedisKey[] = Object.values(EnumLanguages).map(
			lang => this.translateFolder + `${lang}:` + id
		)

		await this.del(keys)

		return true
	}

	async createIpTgBan(ip: string, tgId: number): Promise<boolean> {
		const data = await this.get(this.banFolder + ip)

		const newRaw = {
			tgId,
			reason: "Because you are a bad person",
			streak: 1,
			ttl: new Date().getTime() + ms("10min")
		} as IRedisBanData

		if (!data) {
			await this.set(this.banFolder + ip, JSON.stringify([newRaw]))
			return true
		}

		const existingData = JSON.parse(data) as IRedisBanData[]
		const existingBan = existingData.find(ban => ban.tgId === tgId)

		if (!existingBan)
			await this.set(
				this.banFolder + ip,
				JSON.stringify([...existingData, newRaw])
			)
		else {
			const n = existingBan.streak
			const q = 3
			const base = ms("10min")

			await this.set(
				this.banFolder + ip,
				JSON.stringify([
					...existingData.filter(i => i.tgId !== existingBan.tgId),
					{
						...existingBan,
						streak: n + 1,
						ttl: new Date().getTime() + base * Math.pow(q, n)
					} as IRedisBanData
				])
			)
		}

		return true
	}

	async updateBanStreak(
		ip: string,
		tgId: number,
		streak: number
	): Promise<boolean> {
		const data = await this.get(this.banFolder + ip)
		const existingData = JSON.parse(data) as IRedisBanData[]
		const existingBan = existingData.find(ban => ban.tgId === tgId)

		if (!existingBan) return false

		const newRaw = { ...existingBan, streak } as IRedisBanData
		const newData = [...existingData, newRaw]

		await this.set(this.banFolder + ip, JSON.stringify(newData))

		return true
	}

	async deleteIpTgBan(ip: string, tgId: number): Promise<boolean> {
		const data = await this.get(this.banFolder + ip)

		if (!data) return false

		const existingData = JSON.parse(data) as IRedisBanData[]
		const existingBan = existingData.find(ban => ban.tgId === tgId)

		if (!existingBan) return false

		const newData = existingData.filter(ban => ban.tgId !== tgId)

		await this.set(this.banFolder + ip, JSON.stringify(newData))

		return true
	}

	async checkIpTgBan(ip: string, tgId: number): Promise<boolean> {
		const bannedInfo = await this.get(this.banFolder + ip)

		if (!bannedInfo) return false

		const data = JSON.parse(bannedInfo) as IRedisBanData[]
		const existingBan = data.find(ban => ban.tgId === tgId)

		if (existingBan) {
			if (existingBan.ttl > new Date().getTime()) return true
		}

		return false
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
						const parsed = JSON.parse(value)
						const keyParts = keys[index].split(":")
						const id = keyParts[keyParts.length - 1]

						if (Array.isArray(parsed)) {
							return { id, data: parsed }
						} else {
							const { cookie, ...other } = parsed
							return { id, ...other }
						}
					})
				)
			}
		} while (cursor !== "0")

		return result
	}
}
