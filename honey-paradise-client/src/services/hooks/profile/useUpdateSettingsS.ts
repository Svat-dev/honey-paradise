import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileService } from "@/services/profile.service";
import type { IUpdateUserSettingsDto } from "@/services/types/profile-service.type";
import { queryKeys } from "@/shared/lib/constants/routes";

export const useUpdateSettingsS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getMyAccount], type: "all" });

	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.updateProfileSettings],
		mutationFn: (dto: IUpdateUserSettingsDto) => profileService.updateSettings(dto),
		onSuccess,
	});

	return {
		updateSettingsAsync: mutateAsync,
		updateSettings: mutate,
		isSettingsUpdating: isPending,
	};
};
