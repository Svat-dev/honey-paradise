import type { EmailVerifyDto } from "@/shared/types/server";
import { accountService } from "@/services/account.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useVerifyEmailS = () => {
	const { mutateAsync, isPending, isError } = useMutation({
		mutationKey: [queryKeys.verifyEmail],
		mutationFn: (data: EmailVerifyDto) => accountService.verifyEmail(data),
	});

	return {
		verifyEmailAsync: mutateAsync,
		isVerifying: isPending,
		isVerifiedError: isError,
	};
};
