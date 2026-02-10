import { instance } from "@/api/instance"
import { EnumApiRoute } from "@/shared/lib/constants/routes"
import type { UsePromoCodeDto } from "@/shared/types/server"

export const promoCodeService = {
	useCode: async (dto: UsePromoCodeDto) => {
		const res = await instance.post(EnumApiRoute.USE_PROMO_CODE, dto)

		return res
	}
}
