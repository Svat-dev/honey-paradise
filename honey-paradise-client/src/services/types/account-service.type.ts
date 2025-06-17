export interface IEmailVerificationDto {
	email: string;
}

export interface IEmailVerifyDto {
	token: string;
	isNeedAuth?: boolean;
}
