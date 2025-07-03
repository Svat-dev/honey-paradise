import { Avatar, AvatarFallback, AvatarImage, Button, Skeleton } from "@/components/ui";

import { errorCatch } from "@/api/api-helper";
import { useUpdateAvatarS } from "@/services/hooks/profile/useUpdateAvatarS";
import { ALLOWED_AVATAR_FILE_TYPES, MAX_AVATAR_FILE_SIZE } from "@/shared/lib/constants/base/files.const";
import type { RefetchOptions } from "@tanstack/react-query";
import { getAvatarPath } from "@utils/get-avatar-path";
import { AxiosError } from "axios";
import { TrashIcon } from "lucide-react";
import { useRef, type ChangeEvent, type FC } from "react";
import toast from "react-hot-toast";
import { ProfileSettingSection } from "./ProfileSettingSection";

interface IProps {
	refetch: (opts?: RefetchOptions) => void;
	isAccLoading: boolean;
	username?: string;
	avatarPath?: string;
}

const AvatarSection: FC<IProps> = ({ avatarPath, username, refetch, isAccLoading }) => {
	const inputRef = useRef<HTMLInputElement>(null);

	const { isAvatarUpdating, updateAvatarAsync } = useUpdateAvatarS();

	const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];

		if (!file) return false;

		try {
			const formData = new FormData();
			formData.append("avatar", file);

			await updateAvatarAsync(formData);

			refetch();
			toast.success("Вы успешно обновили изображение профиля");
		} catch (e) {
			const { errMsg } = errorCatch(e as AxiosError);
			toast.error(`Ошибка при обновлении изображения:\n${errMsg}`);
		}
	};

	const handleOnClick = () => inputRef.current?.click();

	const isLoading = isAvatarUpdating || isAccLoading;

	return (
		<ProfileSettingSection title={"Изображение профиля"}>
			<div className="tw-flex tw-items-center tw-gap-4 tw-mt-4 tw-ml-1">
				{isLoading ? (
					<Skeleton className="tw-w-16 tw-h-16 !tw-rounded-full" />
				) : (
					<Avatar className="tw-w-16 tw-h-16">
						<AvatarImage
							src={getAvatarPath(avatarPath)}
							alt={"Изображение профиля"}
							className="tw-animate-show-effect tw-opacity-0"
							width={64}
							height={64}
						/>
						<AvatarFallback>{username?.split("")[0]}</AvatarFallback>
					</Avatar>
				)}

				<input
					type="file"
					accept={ALLOWED_AVATAR_FILE_TYPES.join(",")}
					className="tw-sr-only"
					onChange={handleImageChange}
					ref={inputRef}
				/>

				<div>
					<div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
						<Button variant="secondary" className="tw-py-2 tw-px-2.5 !tw-rounded-2xl" onClick={handleOnClick} isLoading={isLoading}>
							{"Обновить изображение"}
						</Button>

						<Button variant="link" title={"Удалить изображение профиля"} disabled={isLoading}>
							<TrashIcon className="tw-text-muted" size={24} />
						</Button>
					</div>

					<p className="tw-text-muted tw-text-sm tw-font-normal tw-ml-1">
						{`Поддерживаемые форматы: JPG, JPEG, PNG, WEBP или GIF. Макс. размер: ${MAX_AVATAR_FILE_SIZE} МБ.`}
					</p>
				</div>
			</div>
		</ProfileSettingSection>
	);
};

export { AvatarSection };
