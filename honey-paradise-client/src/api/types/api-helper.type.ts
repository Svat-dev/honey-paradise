import type { EnumErrorMsgCodes } from "@constants/base";
import type { AxiosError } from "axios";

export type TAxiosError = AxiosError<{ message: string; error: string }>;

export type TErrorCatchFunction = (error: AxiosError) => { error: TAxiosError; msgCode: EnumErrorMsgCodes; txt: string };
