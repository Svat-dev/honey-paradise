import { queryKeys } from "@constants/routes"
import { useMutation } from "@tanstack/react-query"

import { accountService } from "@/services/account.service"

export const useSendVerificationCodeS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.sendVerificationCode],
		mutationFn: () => accountService.sendVerificationCode()
	})

	return {
		sendEmailCode: mutate,
		sendEmailCodeAsync: mutateAsync,
		isCodeSending: isPending
	}
}
