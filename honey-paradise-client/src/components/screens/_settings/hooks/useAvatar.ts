import { type ChangeEvent, useRef } from "react";

import { errorCatch } from "@/api/api-helper";
import { useUpdateAvatarS } from "@/services/hooks/profile";
import type { TRefetchFunction } from "@/shared/types";
import type { AxiosError } from "axios";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

export const useAvatar = (refetch: TRefetchFunction) => {
	const t = useTranslations("global.settings.content.profile");

	const inputRef = useRef<HTMLInputElement>(null);

	const { isAvatarUpdating, updateAvatarAsync, removeAvatarAsync } = useUpdateAvatarS();

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return false;

		try {
			const formData = new FormData();
			formData.append("avatar", file);

			await updateAvatarAsync(formData);

			refetch();
			toast.success(t("avatar.toasters.update.success"));
		} catch (err) {
			const { errMsg } = errorCatch(err as AxiosError);
			const msg = t("avatar.toasters.update.error", { e: errMsg });
			toast.error(msg);
		}
	};

	const handleUpdate = () => inputRef.current?.click();

	const handleOnDelete = async () => {
		try {
			await removeAvatarAsync();

			refetch();
			toast.success(t("avatar.toasters.delete.success"));
		} catch (err) {
			const { errMsg } = errorCatch(err as AxiosError);
			const msg = t("avatar.toasters.delete.error", { e: errMsg });
			toast.error(msg);
		}
	};

	const isCanDelete = (avatarPath: string | undefined): boolean => {
		if (!avatarPath) return false;
		if (avatarPath.includes("/default.webp")) return false;

		return true;
	};

	return {
		isAvatarUpdating,
		handleImageChange,
		handleUpdate,
		handleOnDelete,
		inputRef,
		isCanDelete,
		t,
	};
};
