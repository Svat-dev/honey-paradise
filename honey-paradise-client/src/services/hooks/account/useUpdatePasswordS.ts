import { EnumSessionStorageKeys } from "@constants/base"
import { EnumAppRoute, queryKeys } from "@constants/routes"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { accountService } from "@/services/account.service"
import { UpdatePasswordAuthDto } from "@/shared/types/server"

export const useUpdatePasswordS = () => {
	const { replace } = useRouter()

	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.updatePassword],
		mutationFn: (dto: UpdatePasswordAuthDto) =>
			accountService.updatePassword(dto),
		onSuccess: data => {
			if (typeof data.data !== "boolean") {
				if (data.data.res === "redirect/logout") {
					sessionStorage.removeItem(
						EnumSessionStorageKeys.CHANGE_PASSWORD_MODAL
					)
					return setTimeout(() => replace(EnumAppRoute.SIGN_IN), 300)
				}
			}
		}
	})

	return {
		updatePassword: mutate,
		updatePasswordAsync: mutateAsync,
		isPasswordUpdating: isPending
	}
}
