import { authService } from "@/services/auth.service";
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
