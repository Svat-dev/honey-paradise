import type { ISignInMutateData } from "@/services/types/hooks/auth-hooks.type";
import { authService } from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";

export const useSignInS = () => {
	const { mutateAsync, isPending, isSuccess } = useMutation({
		mutationKey: ["sign in"],
		mutationFn: (data: ISignInMutateData) => authService.signIn(data.dto, data.recaptcha),
	});

	return {
		signIn: mutateAsync,
		isSignInLoading: isPending,
		isSignedIn: isSuccess,
	};
};
