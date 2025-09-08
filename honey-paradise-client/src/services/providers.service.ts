import { instance } from "@/api/instance";
import { EnumApiRoute } from "@constants/routes";
import type { AxiosResponse } from "axios";
import { IGetAllProvidersResponse } from "./types/provider-service.type";

export const providerService = {
	getAll: async () => {
		const res = await instance.get<any, AxiosResponse<IGetAllProvidersResponse[]>>(EnumApiRoute.ALL_CONNECTIONS);

		return res;
	},

	delete: async (pid: string) => {
		const res = await instance.patch<any, AxiosResponse<boolean>>(EnumApiRoute.DISCONNECT, { pid });

		return res;
	},
};
