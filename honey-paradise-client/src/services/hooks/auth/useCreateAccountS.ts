import { authService } from "@/services/auth.service";
import type { ICreateAccountMutateData } from "@/services/types/hooks/auth-hooks.type";
import { useMutation } from "@tanstack/react-query";

export const useCreateAccountS = () => {
	const { isPending, mutateAsync } = useMutation({
		mutationKey: ["create account"],
		mutationFn: (data: ICreateAccountMutateData) => authService.createAccount(data.dto, data.recaptcha),
	});

	return {
		isCreateAccLoading: isPending,
		createAcc: mutateAsync,
	};
};
