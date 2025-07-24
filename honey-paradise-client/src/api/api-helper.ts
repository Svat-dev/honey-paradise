import type { TAxiosError, TContentTypes, TErrorCatchFunction } from "./types/api-helper.type";

export const getContentType = (type: TContentTypes) => {
	let contentType: string = "application/json";

	if (type === "form-data") contentType = "multipart/form-data";
	else if (type === "image") contentType = "image/webp";

	return { "Content-Type": contentType };
};

export const errorCatch: TErrorCatchFunction = _error => {
	const error = _error as TAxiosError;
	const messages = error?.response?.data?.message;
	const txt = error.response?.data.error as string;

	const errMsg = typeof messages !== "string" ? messages?.[0] : messages;
	const errCause = error.response?.data?.cause || "";

	return { error, errMsg: errMsg || "", txt, errCause };
};
