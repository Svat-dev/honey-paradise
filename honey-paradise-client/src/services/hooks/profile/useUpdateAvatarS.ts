import { profileService } from "@/services/profile.service";
import { useMutation } from "@tanstack/react-query";

export const useUpdateAvatarS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["profile update avatar"],
		mutationFn: (dto: FormData) => profileService.updateAvatar(dto),
	});

	const {
		mutateAsync: _mutateAsync,
		mutate: _mutate,
		isPending: _isPending,
	} = useMutation({
		mutationKey: ["profile delete avatar"],
		mutationFn: () => profileService.deleteAvatar(),
	});

	return {
		updateAvatar: mutate,
		updateAvatarAsync: mutateAsync,
		removeAvatar: _mutate,
		removeAvatarAsync: _mutateAsync,
		isAvatarUpdating: isPending || _isPending,
	};
};
