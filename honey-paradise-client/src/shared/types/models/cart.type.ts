import type { EnumCurrencies } from "./enums.type";

export interface ICart {
	id: string;

	totalPrice: number;
	currency: EnumCurrencies;

	createdAt: Date;
}
