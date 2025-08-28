import { authService } from "@/services/auth.service";
import type { IAuthTfaDto } from "@/services/types/auth-service.type";
import { queryKeys } from "@/shared/lib/constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useSendTFACodeS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.sendTfaCode],
		mutationFn: () => authService.sendTFACode(),
	});

	return {
		sendTFACodeAsync: mutateAsync,
		isTFACodeSending: isPending,
	};
};

export const useVerifyTFACodeS = () => {
	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.verifyTfaCode],
		mutationFn: (dto: IAuthTfaDto) => authService.verifyTFACode(dto),
	});

	return {
		verifyTFACodeAsync: mutateAsync,
		isTFACodeVerifying: isPending,
	};
};
