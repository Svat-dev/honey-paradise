import { useMutation } from "@tanstack/react-query"

import { authService } from "@/services/auth.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import { AuthTfaDto } from "@/shared/types/server"

export const useSendTFACodeS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.sendTfaCode],
		mutationFn: () => authService.sendTFACode()
	})

	return {
		sendTFACodeAsync: mutateAsync,
		isTFACodeSending: isPending
	}
}

export const useVerifyTFACodeS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.verifyTfaCode],
		mutationFn: (dto: AuthTfaDto) => authService.verifyTFACode(dto)
	})

	return {
		verifyTFACodeAsync: mutateAsync,
		isTFACodeVerifying: isPending
	}
}
