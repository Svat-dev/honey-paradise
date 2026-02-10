import { useMutation } from "@tanstack/react-query"

import { authService } from "@/services/auth.service"
import type { ICreateAccountMutateData } from "@/services/types/hooks/auth-hooks.type"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useCreateAccountS = () => {
	const { isPending, mutateAsync } = useMutation({
		mutationKey: [queryKeys.createAccount],
		mutationFn: (data: ICreateAccountMutateData) =>
			authService.createAccount(data.dto, data.recaptcha)
	})

	return {
		isCreateAccLoading: isPending,
		createAcc: mutateAsync
	}
}
