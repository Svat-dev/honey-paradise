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

export interface ITelegramInfoResponse {
	connected: boolean;
	tgUsername: string;
	tgId: string;
}
