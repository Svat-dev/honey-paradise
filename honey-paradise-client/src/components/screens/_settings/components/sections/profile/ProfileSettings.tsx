import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";

import { useMyAccount } from "@hooks/auth";
import { getAvatarPath } from "@utils/get-avatar-path";
import { TrashIcon } from "lucide-react";
import { ProfileSettingSection } from "./ProfileSettingSection";

const ProfileSettings = () => {
	const { user } = useMyAccount();

	return (
		<>
			<ProfileSettingSection title={"Изображение профиля"}>
				<div className="tw-flex tw-items-center tw-gap-4 tw-mt-4 tw-ml-1">
					<Avatar className="tw-w-16 tw-h-16">
						<AvatarImage src={getAvatarPath(user?.avatarPath)} alt={"Изображение профиля"} width={64} height={64} loading="eager" />
						<AvatarFallback>{user?.username.split("")[0]}</AvatarFallback>
					</Avatar>

					<div>
						<div className="tw-flex tw-items-center tw-gap-3 tw-mb-2">
							<Button variant="secondary" className="tw-py-2 tw-px-2.5 !tw-rounded-2xl">
								{"Обновить изображение"}
							</Button>

							<button title={"Удалить изображение профиля"}>
								<TrashIcon className="tw-text-muted" size={24} />
							</button>
						</div>

						<p className="tw-text-muted tw-text-sm tw-font-normal tw-ml-1">
							{"Поддерживаемые форматы: JPG, JPEG, PNG, WEBP или GIF. Макс. размер: 10 МБ."}
						</p>
					</div>
				</div>
			</ProfileSettingSection>
		</>
	);
};

export { ProfileSettings };
