import type { AxiosResponse } from "axios"

import { instance } from "@/api/instance"
import { EnumApiRoute } from "@/shared/lib/constants/routes"
import type {
	CreateReviewsDto,
	DefaultResponse,
	GetReviewsByPidResponse,
	ReactToReviewDto,
	UpdateReviewDto
} from "@/shared/types/server"

export const reviewService = {
	getProductsReviews: async (query: { pid: string }) => {
		const res = await instance.get<any, AxiosResponse<GetReviewsByPidResponse>>(
			EnumApiRoute.GET_PRODUCTS_REVIEW,
			{
				params: query
			}
		)

		return res.data
	},

	createProductReview: async (dto: CreateReviewsDto) => {
		const res = await instance.post<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.CREATE_REVIEW,
			dto
		)

		return res
	},

	reactToReview: async (dto: ReactToReviewDto) => {
		const res = await instance.patch<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.REACT_TO_REVIEW,
			dto
		)

		return res
	},

	editReview: async (dto: UpdateReviewDto) => {
		const res = await instance.put<any, AxiosResponse<DefaultResponse>>(
			EnumApiRoute.EDIT_REVIEW,
			dto
		)

		return res
	},

	deleteReview: async (id: string) => {
		const res = await instance.delete<any, AxiosResponse<DefaultResponse>>(
			`${EnumApiRoute.DELETE_REVIEW}/${id}`
		)

		return res
	}
}
