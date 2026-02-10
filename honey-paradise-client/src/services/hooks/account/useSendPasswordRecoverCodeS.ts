import { queryKeys } from "@constants/routes"
import { useMutation } from "@tanstack/react-query"

import { accountService } from "@/services/account.service"

export const useSendPasswordRecoverCodeS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.sendRecoverPasswordCode],
		mutationFn: () => accountService.sendPasswordRecoverCode()
	})

	return {
		sendPasswordRecoverCode: mutate,
		sendPasswordRecoverCodeAsync: mutateAsync,
		isCodeSending: isPending
	}
}
