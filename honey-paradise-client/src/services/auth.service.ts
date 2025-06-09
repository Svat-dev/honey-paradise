import { defaultInstance } from "@/api/instance";
import { EnumApiRoute } from "@constants/routes";
import type { ICreateAccountDto } from "./types/auth-service.type";

export const authService = {
	createAccount: async (dto: ICreateAccountDto, recaptcha?: string) => {
		const headers = recaptcha ? { recaptcha } : undefined;

		const data: ICreateAccountDto = {
			...dto,
			username: dto.username || undefined,
			birthdate: dto.birthdate || undefined,
		};

		const res = await defaultInstance.post<boolean>(EnumApiRoute.CREATE_ACCOUNT, data, { headers });

		return res.data;
	},
};
