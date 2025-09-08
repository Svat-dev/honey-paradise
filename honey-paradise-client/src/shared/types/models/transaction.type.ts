import type { EnumTransactionStatus } from "./enums.type";

export interface ITransaction {
	id: string;
	externalId?: string;

	amount: number;
	status: EnumTransactionStatus;

	userId: string;
	orderId: string;

	createdAt: Date;
	updatedAt: Date;
}
