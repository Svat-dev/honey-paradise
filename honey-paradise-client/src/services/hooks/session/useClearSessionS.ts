import { useMutation } from "@tanstack/react-query"

import { sessionService } from "@/services/session.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useClearSessionS = () => {
	const { mutate, isPending } = useMutation({
		mutationKey: [queryKeys.clearSession],
		mutationFn: () => sessionService.clearSession()
	})

	return { clearSession: mutate, isClearingSession: isPending }
}
