import { ALLOWED_AVATAR_FILE_TYPES, MAX_AVATAR_FILE_SIZE } from "@constants/base";
import { Avatar, AvatarFallback, AvatarImage, Button, Skeleton } from "@/components/ui/common";

import type { FC } from "react";
import { ProfileSettingSection } from "./ProfileSettingSection";
import type { RefetchOptions } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { getAvatarPath } from "@utils/get-avatar-path";
import styles from "../../../styles/profile.module.scss";
import { useAvatar } from "../../../hooks/useAvatar";

interface IProps {
	refetch: (opts?: RefetchOptions) => void;
	isAccLoading: boolean;
	username?: string;
	avatarPath?: string;
}

const AvatarSection: FC<IProps> = ({ avatarPath, username, refetch, isAccLoading }) => {
	const { handleImageChange, handleOnDelete, isAvatarUpdating, handleUpdate, inputRef, isCanDelete, t } = useAvatar(refetch);

	const isLoading = isAvatarUpdating || isAccLoading;

	return (
		<ProfileSettingSection title={t("avatar.title")}>
			<div className={styles["avatar-wrapper"]}>
				{isLoading ? (
					<Skeleton className={styles["avatar-loading"]} />
				) : (
					<Avatar className={styles["avatar-image"]}>
						<AvatarImage src={getAvatarPath(avatarPath)} alt={t("labels.avatarImage")} width={96} height={96} />
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

				<div className={styles["avatar-actions"]}>
					<div>
						<Button variant="secondary" onClick={handleUpdate} isLoading={isLoading}>
							{t("avatar.updateBtn")}
						</Button>

						<Button
							variant="link"
							title={t("labels.deleteAvatar")}
							onClick={handleOnDelete}
							disabled={isLoading || !isCanDelete(avatarPath)}
						>
							<TrashIcon className="tw-text-muted" size={24} />
						</Button>
					</div>

					<p>{t("avatar.uploadRules", { file_size: MAX_AVATAR_FILE_SIZE })}</p>
				</div>
			</div>
		</ProfileSettingSection>
	);
};

export { AvatarSection };
