import type { ITelegramSessionData } from "./types/bot.type"

export class MemoryStorage {
	private storage: Map<string, ITelegramSessionData> = new Map()

	get(userId: string | number): ITelegramSessionData | undefined {
		userId = this.getId(userId)

		return this.storage.get(userId)
	}

	set(userId: string | number, data: ITelegramSessionData): void {
		userId = this.getId(userId)

		this.storage.set(userId, data)
	}

	update(userId: string | number, data: Partial<ITelegramSessionData>): void {
		userId = this.getId(userId)

		const existing = this.storage.get(userId) || {}
		this.storage.set(userId, { ...existing, ...data })
	}

	delete(userId: string | number): boolean {
		userId = this.getId(userId)

		return this.storage.delete(userId)
	}

	getAll(): Map<string, ITelegramSessionData> {
		return this.storage
	}

	private getId(id: number | string): string {
		if (typeof id === "number") return `${id}:${id}`

		return id
	}
}
