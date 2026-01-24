import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useMemo } from "react"

import { providerService } from "@/services/providers.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useRemoveProviderS = () => {
	const client = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.deleteProvider],
		mutationFn: (id: string) => providerService.delete(id),
		onSuccess: () =>
			client.invalidateQueries({ queryKey: [queryKeys.getAllProviders] })
	})

	return useMemo(
		() => ({
			removeProviderAsync: mutateAsync,
			isRemoving: isPending
		}),
		[mutateAsync, isPending]
	)
}
