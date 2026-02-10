import { useMutation } from "@tanstack/react-query"

import { queryKeys } from "@/shared/lib/constants/routes"
import { TranslationsControllerTranslateModel } from "@/shared/types/server"

import { yaTranslateService } from "../ya-translate.service"

export const useYaTranslate = (id: string) => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.translateReview, id],
		mutationFn: (type: TranslationsControllerTranslateModel) =>
			yaTranslateService.translate(id, { model: type })
	})

	return {
		isTranslating: isPending,
		translateAsync: mutateAsync
	}
}
