import type { EnumOrderStatus } from "./enums.type";

export interface IOrder {
	id: string;

	totalAmount: number;
	status: EnumOrderStatus;

	items: JSON;

	userId: string;

	createdAt: Date;
	updatedAt: Date;
}
