import { useMutation, useQueryClient } from "@tanstack/react-query"

import { profileService } from "@/services/profile.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { UpdateAvatarFrameDto } from "@/shared/types/server"

export const useUpdateAvatarFrameS = () => {
	const client = useQueryClient()

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.updateAvatarFrame],
		mutationFn: (dto: UpdateAvatarFrameDto) =>
			profileService.updateAvatarFrame(dto),
		onSuccess: () =>
			client.refetchQueries({ queryKey: [queryKeys.getMyAccount], type: "all" })
	})

	return {
		updateAvatarFrameAsync: mutateAsync,
		isAvatarFrameUpdating: isPending
	}
}
