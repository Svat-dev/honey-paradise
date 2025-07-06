import { profileService } from "@/services/profile.service";
import type { IUpdateUserSettingsDto } from "@/services/types/profile-service.type";
import { useMutation } from "@tanstack/react-query";

export const useUpdateSettingsS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["profile update settings"],
		mutationFn: (dto: IUpdateUserSettingsDto) => profileService.updateSettings(dto),
	});

	return {
		updateSettingsAsync: mutateAsync,
		updateSettings: mutate,
		isSettingsUpdating: isPending,
	};
};
