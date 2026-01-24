import type { AuthLoginDto, CreateUserDto } from "@/shared/types/server"

export interface ISignInMutateData {
	dto: AuthLoginDto
	recaptcha: any
}

export interface ICreateAccountMutateData {
	dto: CreateUserDto
	recaptcha: any
}
