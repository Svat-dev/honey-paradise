import type { AxiosError } from "axios"

export type TContentTypes = "json" | "image" | "form-data"

export type TAxiosError = AxiosError<{
	message: string
	error: string
	cause: string | undefined
}>

export type TErrorCatchFunction = (error: AxiosError) => {
	error: TAxiosError
	errMsg: string
	txt: string
	errCause: string
}
