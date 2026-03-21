import type { AxiosResponse } from "axios"

import { defaultInstance, instance } from "@/api/instance"
import { EnumApiRoute } from "@/shared/lib/constants/routes"
import type {
	CreateCommentDto,
	DefaultResponse,
	GetCommentsResponse,
	ReplyToCommentDto
} from "@/shared/types/server"

export const commentsService = {
	getByReviewId: async (reviewId: string) => {
		const res = await defaultInstance.get<
			any,
			AxiosResponse<GetCommentsResponse[]>
		>(`${EnumApiRoute.COMMENTS}/${reviewId}`)

		return res
	},

	createComment: async (dto: CreateCommentDto) => {
		const res = await instance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.CREATE_COMMENT,
			dto
		)

		return res
	},

	replyToComment: async (dto: ReplyToCommentDto) => {
		const res = await instance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.REPLY_COMMENT,
			dto
		)

		return res
	},

	deleteComment: async (id: string) => {
		const res = await instance.delete<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.DELETE_COMMENT(id)
		)

		return res
	}
}
