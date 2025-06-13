import { authService } from "@/services/auth.service";
import type { ISignInMutateData } from "@/services/types/hooks/auth-hooks.type";
import { useMutation } from "@tanstack/react-query";

export const useSignInS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["sign in"],
		mutationFn: (data: ISignInMutateData) => authService.signIn(data.dto, data.recaptcha),
	});

	return {
		signIn: mutateAsync,
		isSignInLoading: isPending,
	};
};
