import type { ICreateAccountDto, ISignInDto } from "../auth-service.type";

export interface ISignInMutateData {
	dto: ISignInDto;
	recaptcha: any;
}

export interface ICreateAccountMutateData {
	dto: ICreateAccountDto;
	recaptcha: any;
}
