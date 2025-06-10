import type { TAxiosError, TErrorCatchFunction } from "./types/api-helper.type";

import type { EnumErrorMsgCodes } from "@constants/base";

export const getContentType = () => ({
	"Content-Type": "application/json",
});

export const errorCatch: TErrorCatchFunction = _error => {
	const error = _error as TAxiosError;
	const msgCodes = error?.response?.data?.message;
	const txt = error.response?.data.error as string;

	const msgCode = typeof msgCodes === "object" ? (msgCodes[0] as unknown as EnumErrorMsgCodes) : (msgCodes as unknown as EnumErrorMsgCodes);

	return { error, msgCode, txt };
};
