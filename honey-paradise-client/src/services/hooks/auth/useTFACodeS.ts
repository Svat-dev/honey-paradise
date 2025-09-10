import { AuthTfaDto } from "@/shared/types/server";
import { authService } from "@/services/auth.service";
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
		mutationFn: (dto: AuthTfaDto) => authService.verifyTFACode(dto),
	});

	return {
		verifyTFACodeAsync: mutateAsync,
		isTFACodeVerifying: isPending,
	};
};
