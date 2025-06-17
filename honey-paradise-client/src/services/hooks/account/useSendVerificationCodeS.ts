import { accountService } from "@/services/account.service";
import { useMutation } from "@tanstack/react-query";

export const useSendVerificationCodeS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["send email verification code"],
		mutationFn: (email: string) => accountService.sendVerificationCode({ email }),
	});

	return {
		sendEmailCode: mutate,
		sendEmailCodeAsync: mutateAsync,
		isCodeSending: isPending,
	};
};
