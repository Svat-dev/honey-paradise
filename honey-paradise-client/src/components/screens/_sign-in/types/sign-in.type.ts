import type { ISignInDto } from "@/services/types/auth-service.type";

export interface ISignInMutateData {
	dto: ISignInDto;
	recaptcha: any;
}
