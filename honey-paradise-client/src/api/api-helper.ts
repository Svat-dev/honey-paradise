import type { TAxiosError, TErrorCatchFunction } from "./types/api-helper.type";

export const getContentType = () => ({
	"Content-Type": "application/json",
});

export const errorCatch: TErrorCatchFunction = _error => {
	const error = _error as TAxiosError;
	const messages = error?.response?.data?.message;
	const txt = error.response?.data.error as string;

	const errMsg = typeof messages !== "string" ? messages?.[0] : messages;

	return { error, errMsg: errMsg || "", txt };
};
