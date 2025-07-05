import { profileService } from "@/services/profile.service";
import { IUpdateProfileDto } from "@/services/types/profile-service.type";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfileS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["profile update"],
		mutationFn: (dto: IUpdateProfileDto) => profileService.updateProfile(dto),
	});

	return {
		updateProfile: mutate,
		updateProfileAsync: mutateAsync,
		isProfileUpdating: isPending,
	};
};
