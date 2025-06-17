import { accountService } from "@/services/account.service";
import { IEmailVerifyDto } from "@/services/types/account-service.type";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmailS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: ["verify email"],
		mutationFn: (data: IEmailVerifyDto) => accountService.verifyEmail(data),
	});

	return {
		verifyEmailAsync: mutateAsync,
		isVerifying: isPending,
	};
};
