import { GetMySettingsResponseDefaultCurrency } from "../server"

export interface ICart {
	id: string

	totalPrice: number
	currency: GetMySettingsResponseDefaultCurrency

	createdAt: Date
}
