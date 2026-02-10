import { queryKeys } from "@constants/routes"
import { useMutation } from "@tanstack/react-query"

import { accountService } from "@/services/account.service"
import { UpdatePasswordDto } from "@/shared/types/server"

export const useRecoverPasswordS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.recoverPassword],
		mutationFn: (dto: UpdatePasswordDto) => accountService.recoverPassword(dto)
	})

	return {
		recoverPassword: mutate,
		recoverPasswordAsync: mutateAsync,
		isPasswordRecovering: isPending
	}
}
