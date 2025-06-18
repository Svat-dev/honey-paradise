import type { AxiosError } from "axios";

export type TAxiosError = AxiosError<{ message: string; error: string }>;

export type TErrorCatchFunction = (error: AxiosError) => { error: TAxiosError; errMsg: string; txt: string };
