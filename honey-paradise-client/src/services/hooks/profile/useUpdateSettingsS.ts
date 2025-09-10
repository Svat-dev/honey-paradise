import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Nullable } from "@/shared/types";
import type { UpdateUserSettingsDto } from "@/shared/types/server";
import { profileService } from "@/services/profile.service";
import { queryKeys } from "@/shared/lib/constants/routes";

export const useUpdateSettingsS = () => {
	const client = useQueryClient();

	const onSuccess = () => client.invalidateQueries({ queryKey: [queryKeys.getMyAccount], type: "all" });

	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: [queryKeys.updateProfileSettings],
		mutationFn: (dto: Nullable<UpdateUserSettingsDto>) => profileService.updateSettings(dto),
		onSuccess,
	});

	return {
		updateSettingsAsync: mutateAsync,
		updateSettings: mutate,
		isSettingsUpdating: isPending,
	};
};
