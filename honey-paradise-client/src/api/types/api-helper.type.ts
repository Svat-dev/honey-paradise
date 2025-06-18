import type { AxiosError } from "axios";

export type TAxiosError = AxiosError<{ message: string; error: string; cause: string | undefined }>;

export type TErrorCatchFunction = (error: AxiosError) => {
	error: TAxiosError;
	errMsg: string;
	txt: string;
	errCause: string;
};
