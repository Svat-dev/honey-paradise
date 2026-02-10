import { useMutation } from "@tanstack/react-query"

import { accountService } from "@/services/account.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { EmailVerifyDto } from "@/shared/types/server"

export const useVerifyEmailS = () => {
	const { mutateAsync, isPending, isError } = useMutation({
		mutationKey: [queryKeys.verifyEmail],
		mutationFn: (data: EmailVerifyDto) => accountService.verifyEmail(data)
	})

	return {
		verifyEmailAsync: mutateAsync,
		isVerifying: isPending,
		isVerifiedError: isError
	}
}
