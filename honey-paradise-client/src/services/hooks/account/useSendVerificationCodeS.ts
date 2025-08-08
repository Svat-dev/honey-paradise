import { accountService } from "@/services/account.service";
import { useMutation } from "@tanstack/react-query";

export const useSendVerificationCodeS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["send email verification code"],
		mutationFn: () => accountService.sendVerificationCode(),
	});

	return {
		sendEmailCode: mutate,
		sendEmailCodeAsync: mutateAsync,
		isCodeSending: isPending,
	};
};
