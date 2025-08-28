import { accountService } from "@/services/account.service";
import { IEmailVerifyDto } from "@/services/types/account-service.type";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmailS = () => {
	const { mutateAsync, isPending, isError } = useMutation({
		mutationKey: [queryKeys.verifyEmail],
		mutationFn: (data: IEmailVerifyDto) => accountService.verifyEmail(data),
	});

	return {
		verifyEmailAsync: mutateAsync,
		isVerifying: isPending,
		isVerifiedError: isError,
	};
};
