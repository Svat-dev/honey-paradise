export interface IEmailVerificationDto {
	email: string;
}

export interface IUpdatePasswordDto {
	password: string;
}

export interface IRecoverPasswordDto {
	password: string;
	token: string;
}

export interface IPasswordRecoverDto {
	email: string;
}

export interface IEmailVerifyDto {
	token: string;
	isNeedAuth?: boolean;
}
