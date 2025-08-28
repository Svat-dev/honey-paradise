import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileService } from "@/services/profile.service";
import { IUpdateProfileDto } from "@/services/types/profile-service.type";
import { queryKeys } from "@/shared/lib/constants/routes";

export const useUpdateProfileS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getMyAccount], type: "all" });

	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.updateProfile],
		mutationFn: (dto: IUpdateProfileDto) => profileService.updateProfile(dto),
		onSuccess,
	});

	return {
		updateProfile: mutate,
		updateProfileAsync: mutateAsync,
		isProfileUpdating: isPending,
	};
};
