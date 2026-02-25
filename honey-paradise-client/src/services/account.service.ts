import { EnumApiRoute } from "@constants/routes"
import type { AxiosResponse } from "axios"

import { defaultInstance, instance } from "@/api/instance"
import type {
	ConnectTelegramResponse,
	DefaultResponse,
	EmailVerifyDto,
	GetMeResponse,
	GetTgInfoResponse,
	UpdateEmailDto,
	UpdatePasswordAuthDto,
	UpdatePasswordDto
} from "@/shared/types/server"

import type { TUpdatePasswordResponse } from "./types/account-service.type"

export const accountService = {
	getMyAccount: async () => {
		const res = await instance.get<any, AxiosResponse<GetMeResponse>>(
			EnumApiRoute.MY_ACCOUNT
		)

		return res
	},

	getTelegramInfo: async () => {
		const res = await instance.get<any, AxiosResponse<GetTgInfoResponse>>(
			EnumApiRoute.TELEGRAM
		)

		return res
	},

	updateEmail: async (dto: UpdateEmailDto) => {
		const res = await instance.patch<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.UPDATE_EMAIL,
			dto
		)

		return res
	},

	connectTelegram: async () => {
		const res = await instance.post<
			any,
			AxiosResponse<ConnectTelegramResponse>
		>(EnumApiRoute.CONNECT_TG)

		return res.data
	},

	disconnectTelegram: async () => {
		const res = await instance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.DISCONNECT_TG
		)

		return res
	},

	updatePassword: async (dto: UpdatePasswordAuthDto) => {
		const res = await instance.patch<
			any,
			AxiosResponse<TUpdatePasswordResponse>
		>(EnumApiRoute.UPDATE_PASSWORD, dto)

		return res
	},

	recoverPassword: async (dto: UpdatePasswordDto) => {
		const res = await defaultInstance.patch<
			any,
			AxiosResponse<DefaultResponse>
		>(EnumApiRoute.RECOVER_PASSWORD, dto)

		return res
	},

	sendVerificationCode: async () => {
		const res = await defaultInstance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.SEND_EMAIL_VERIFICATION_CODE
		)

		return res
	},

	sendPasswordRecoverCode: async () => {
		const res = await defaultInstance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.RESET_PASSWORD
		)

		return res
	},

	verifyEmail: async (dto: EmailVerifyDto) => {
		const res = await defaultInstance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.VERIFY_EMAIL,
			dto
		)

		return res
	}
}
