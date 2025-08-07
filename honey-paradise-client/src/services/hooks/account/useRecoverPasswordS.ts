import { accountService } from "@/services/account.service";
import type { IRecoverPasswordDto } from "@/services/types/account-service.type";
import { useMutation } from "@tanstack/react-query";

export const useRecoverPasswordS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["account recover password"],
		mutationFn: (dto: IRecoverPasswordDto) => accountService.recoverPassword(dto),
	});

	return {
		recoverPassword: mutate,
		recoverPasswordAsync: mutateAsync,
		isPasswordRecovering: isPending,
	};
};
