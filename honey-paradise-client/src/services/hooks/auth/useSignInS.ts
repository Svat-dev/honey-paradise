import { authService } from "@/services/auth.service";
import { IAuthTfaDto } from "@/services/types/auth-service.type";
import type { ISignInMutateData } from "@/services/types/hooks/auth-hooks.type";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useSignInS = () => {
	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationKey: [queryKeys.signIn],
		mutationFn: (data: ISignInMutateData) => authService.signIn(data.dto, data.recaptcha),
	});

	return {
		signIn: mutateAsync,
		isSignInLoading: isPending,
		isSignedIn: isSuccess,
	};
};

export const useTelegramSignInS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.telegramSignIn],
		mutationFn: (dto: IAuthTfaDto) => authService.telegramSignIn(dto),
	});

	return {
		tgSignIn: mutateAsync,
		isTgSignInLoading: isPending,
	};
};

export const useCancelTelegramSignInS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.cancelTelegramSignIn],
		mutationFn: () => authService.cancelTelegramSignIn(),
	});

	return {
		cancelTgSignIn: mutateAsync,
		isCancelTgSignInLoading: isPending,
	};
};
