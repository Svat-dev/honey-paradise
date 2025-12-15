import type { CreateReviewsDto, GetReviewsByPidResponse, ReactToReviewDto } from "@/shared/types/server";

import type { AxiosResponse } from "axios";
import { EnumApiRoute } from "@/shared/lib/constants/routes";
import { instance } from "@/api/instance";

export const reviewService = {
	getProductsReviews: async (productId: string) => {
		const res = await instance.get<any, AxiosResponse<GetReviewsByPidResponse>>(EnumApiRoute.GET_PRODUCTS_REVIEW, {
			params: { id: productId },
		});

		return res.data;
	},

	createProductReview: async (dto: CreateReviewsDto) => {
		const res = await instance.post<any, AxiosResponse<boolean>>(EnumApiRoute.CREATE_REVIEW, dto);

		return res;
	},

	reactToReview: async (dto: ReactToReviewDto) => {
		const res = await instance.post<any, AxiosResponse<boolean>>(EnumApiRoute.REACT_TO_REVIEW, dto);

		return res;
	},
};
