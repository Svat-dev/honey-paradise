import { instance } from "@/api/instance";
import type { IDefaultProvider } from "@/shared/types/models/provider.type";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";

export const providerService = {
	getAll: async () => {
		const res = await instance.get<any, AxiosResponse<IDefaultProvider[]>>(EnumApiRoute.ALL_CONNECTIONS);

		return res;
	},

	delete: async (pid: string) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.DISCONNECT, { pid });

		return res;
	},
};
