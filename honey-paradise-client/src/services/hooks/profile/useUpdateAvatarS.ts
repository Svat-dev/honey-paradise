import { useMutation, useQueryClient } from "@tanstack/react-query"

import { profileService } from "@/services/profile.service"
import { queryKeys } from "@/shared/lib/constants/routes"

export const useUpdateAvatarS = () => {
	const client = useQueryClient()

	const onSuccess = () =>
		client.invalidateQueries({
			queryKey: [queryKeys.getMyAccount],
			type: "all"
		})

	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.updateProfileAvatar],
		mutationFn: (dto: FormData) => profileService.updateAvatar(dto),
		onSuccess
	})

	const {
		mutateAsync: _mutateAsync,
		mutate: _mutate,
		isPending: _isPending
	} = useMutation({
		mutationKey: [queryKeys.deleteProfileAvatar],
		mutationFn: () => profileService.deleteAvatar(),
		onSuccess
	})

	return {
		updateAvatar: mutate,
		updateAvatarAsync: mutateAsync,
		removeAvatar: _mutate,
		removeAvatarAsync: _mutateAsync,
		isAvatarUpdating: isPending || _isPending
	}
}
