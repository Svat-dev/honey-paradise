import { accountService } from "@/services/account.service";
import { useMutation } from "@tanstack/react-query";

export const useSendPasswordRecoverCodeS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["send password recover code"],
		mutationFn: (email: string) => accountService.sendPasswordRecoverCode({ email }),
	});

	return {
		sendPasswordRecoverCode: mutate,
		sendPasswordRecoverCodeAsync: mutateAsync,
		isCodeSending: isPending,
	};
};
