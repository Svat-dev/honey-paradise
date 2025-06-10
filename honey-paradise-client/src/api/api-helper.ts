import type { TAxiosError, TErrorCatchFunction } from "./types/api-helper.type";

import type { EnumErrorMsgCodes } from "@constants/base";

export const getContentType = () => ({
	"Content-Type": "application/json",
});

export const errorCatch: TErrorCatchFunction = _error => {
	const error = _error as TAxiosError;
	const msgCode = error?.response?.data?.message as unknown as EnumErrorMsgCodes;
	const txt = error.response?.data.error as string;

	return { error, msgCode, txt };
};
