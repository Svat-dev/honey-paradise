import { useMutation, useQueryClient } from "@tanstack/react-query"

import { promoCodeService } from "@/services/promo-code.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import { UsePromoCodeDto } from "@/shared/types/server"

export const usePromoCodeS = () => {
	const client = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.usePromoCode],
		mutationFn: (dto: UsePromoCodeDto) => promoCodeService.useCode(dto),
		onSuccess: () =>
			client.refetchQueries({ queryKey: [queryKeys.getMyCart], type: "all" })
	})

	return {
		usePromoCodeAsync: mutateAsync,
		isPromoCodeUsing: isPending
	}
}
