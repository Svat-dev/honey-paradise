export interface IEmailVerificationDto {
	email: string;
}

export interface IPasswordRecoverDto {
	email: string;
}

export interface IEmailVerifyDto {
	token: string;
	isNeedAuth?: boolean;
}
