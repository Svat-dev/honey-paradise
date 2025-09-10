import { accountService } from "@/services/account.service";
import { queryKeys } from "@constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useSendPasswordRecoverCodeS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.sendRecoverPasswordCode],
		mutationFn: () => accountService.sendPasswordRecoverCode(),
	});

	return {
		sendPasswordRecoverCode: mutate,
		sendPasswordRecoverCodeAsync: mutateAsync,
		isCodeSending: isPending,
	};
};
