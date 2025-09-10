import { UpdatePasswordDto } from "@/shared/types/server";
import { accountService } from "@/services/account.service";
import { queryKeys } from "@constants/routes";
import { useMutation } from "@tanstack/react-query";

export const useRecoverPasswordS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.recoverPassword],
		mutationFn: (dto: UpdatePasswordDto) => accountService.recoverPassword(dto),
	});

	return {
		recoverPassword: mutate,
		recoverPasswordAsync: mutateAsync,
		isPasswordRecovering: isPending,
	};
};
