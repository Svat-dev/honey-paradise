import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileService } from "@/services/profile.service";
import { queryKeys } from "@/shared/lib/constants/routes";
import toast from "react-hot-toast";

export const useUploadSettingsS = () => {
	const client = useQueryClient();

	const { mutateAsync, isPending } = useMutation({
		mutationKey: [queryKeys.uploadUserSettings],
		mutationFn: (formData: FormData) => profileService.uploadSettings(formData),
		onSuccess: ({ data: { username } }) => {
			if (username) {
				toast.success(`Настройки пользователя ${username} успешно применены!`);
			} else {
				toast.success("Настройки успешно применены и сохранены!");
			}

			client.invalidateQueries({ queryKey: [queryKeys.getMyAccount] });
		},
	});

	return {
		uploadSettingsAsync: mutateAsync,
		isSettingsUploading: isPending,
	};
};
