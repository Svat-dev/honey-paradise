import { useMutation } from "@tanstack/react-query"

import { authService } from "@/services/auth.service"
import type { ISignInMutateData } from "@/services/types/hooks/auth-hooks.type"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useSignInS = () => {
	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationKey: [queryKeys.signIn],
		mutationFn: (data: ISignInMutateData) =>
			authService.signIn(data.dto, data.recaptcha)
	})

	return {
		signIn: mutateAsync,
		isSignInLoading: isPending,
		isSignedIn: isSuccess
	}
}

export const useTelegramSignInS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.telegramSignIn],
		mutationFn: () => authService.telegramSignIn()
	})

	return {
		tgSignIn: mutateAsync,
		isTgSignInLoading: isPending
	}
}

export const useCancelTelegramSignInS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.cancelTelegramSignIn],
		mutationFn: () => authService.cancelTelegramSignIn()
	})

	return {
		cancelTgSignIn: mutateAsync,
		isCancelTgSignInLoading: isPending
	}
}
