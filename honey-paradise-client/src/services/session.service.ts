import { defaultInstance, instance } from "@/api/instance";

import type { ISession } from "@/shared/types/models/session.type";
import { EnumApiRoute } from "@constants/routes";

export const sessionService = {
	clearSession: async () => {
		const res = await defaultInstance.post(EnumApiRoute.CLEAR_SESSION, {});

		return res;
	},

	getByUser: async () => {
		const res = await instance.get<ISession[]>(EnumApiRoute.GET_SESSION_BY_USER);

		return res;
	},

	getCurrent: async () => {
		const res = await instance.get<ISession>(EnumApiRoute.CURRENT_SESSION);

		return res;
	},

	removeSession: async (sessionId: string) => {
		const res = await instance.delete<boolean>(`${EnumApiRoute.REMOVE_SESSION}/${sessionId}`);

		return res;
	},

	removeAllSessions: async () => {
		const res = await instance.delete<boolean>(EnumApiRoute.REMOVE_ALL_SESSIONS);

		return res;
	},
};
