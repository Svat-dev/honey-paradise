import { useMutation } from "@tanstack/react-query"

import type { IYandexTranslateDto } from "@/shared/types"

import { yaTranslateService } from "../ya-translate.service"

export const useYaTranslate = (id: string) => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["translate", id],
		mutationFn: (dto: IYandexTranslateDto) => yaTranslateService.translate(dto)
	})

	return {
		isTranslating: isPending,
		translateAsync: mutateAsync
	}
}
