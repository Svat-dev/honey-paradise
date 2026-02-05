import { useMutation } from "@tanstack/react-query"

import { queryKeys } from "@/shared/lib/constants/routes"
import type { IYandexTranslateDto } from "@/shared/types"

import { yaTranslateService } from "../ya-translate.service"

export const useYaTranslate = (id: string) => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.translateReview, id],
		mutationFn: (dto: IYandexTranslateDto) => yaTranslateService.translate(dto)
	})

	return {
		isTranslating: isPending,
		translateAsync: mutateAsync
	}
}
