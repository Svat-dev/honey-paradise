import { IEmailVerifyDto } from "@/services/types/account-service.type";
import { accountService } from "@/services/account.service";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmailS = () => {
	const { mutateAsync, isPending, isError } = useMutation({
		mutationKey: ["verify email"],
		mutationFn: (data: IEmailVerifyDto) => accountService.verifyEmail(data),
	});

	return {
		verifyEmailAsync: mutateAsync,
		isVerifying: isPending,
		isVerifiedError: isError,
	};
};
