import type { TAxiosError, TErrorCatchFunction } from "./types/api-helper.type";

export const getContentType = () => ({
	"Content-Type": "application/json",
});

export const errorCatch: TErrorCatchFunction = _error => {
	const error = _error as TAxiosError;
	const errMsg = error?.response?.data?.message as string;
	const errText = error.response?.data.error as string;

	return { error, errMsg, errText };
};
