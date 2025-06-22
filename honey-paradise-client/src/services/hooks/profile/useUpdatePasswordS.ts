import { profileService } from "@/services/profile.service";
import type { IUpdatePasswordDto } from "@/services/types/profile-service.type";
import { useMutation } from "@tanstack/react-query";

export const useUpdatePasswordS = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationKey: ["profile update password"],
		mutationFn: (dto: IUpdatePasswordDto) => profileService.updatePassword(dto),
	});

	return {
		updatePassword: mutate,
		updatePasswordAsync: mutateAsync,
		isPasswordUpdating: isPending,
	};
};
