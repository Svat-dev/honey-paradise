import type { AuthTfaDto } from "@/shared/types/server";
import type { ISignInMutateData } from "@/services/types/hooks/auth-hooks.type";
import { authService } from "@/services/auth.service";
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
		mutationFn: (dto: AuthTfaDto) => authService.telegramSignIn(dto),
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
