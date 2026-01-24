import { useMutation, useQueryClient } from "@tanstack/react-query"

import { profileService } from "@/services/profile.service"
import { queryKeys } from "@/shared/lib/constants/routes"
import type { Nullable } from "@/shared/types"
import { UpdateUserDto } from "@/shared/types/server"

export const useUpdateProfileS = () => {
	const client = useQueryClient()

	const onSuccess = () =>
		client.invalidateQueries({
			queryKey: [queryKeys.getMyAccount],
			type: "all"
		})

	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.updateProfile],
		mutationFn: (dto: Nullable<UpdateUserDto>) =>
			profileService.updateProfile(dto),
		onSuccess
	})

	return {
		updateProfile: mutate,
		updateProfileAsync: mutateAsync,
		isProfileUpdating: isPending
	}
}
