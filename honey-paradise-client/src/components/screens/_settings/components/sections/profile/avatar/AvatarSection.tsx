import { Avatar, AvatarFallback, AvatarFrame, AvatarImage, Button, Skeleton } from "@/components/ui/common";
import { ALLOWED_AVATAR_FILE_TYPES, MAX_AVATAR_FILE_SIZE } from "@constants/base";
import { getAvatarPath, getFramesPath } from "@utils/get-avatar-path";

import { ConfirmModal } from "@/components/ui/components/ConfirmModal";
import { TrashIcon } from "lucide-react";
import type { FC } from "react";
import { useAvatar } from "../../../../hooks/useAvatar";
import styles from "../../../../styles/profile.module.scss";
import { ProfileSettingSection } from "../ProfileSettingSection";
import { FrameDialog } from "./FrameDialog";

interface IProps {
	isAccLoading: boolean;
	username?: string;
	avatarPath?: string;
	framePath?: string | null;
}

const AvatarSection: FC<IProps> = ({ avatarPath, framePath, username, isAccLoading }) => {
	const { handleImageChange, handleOnDelete, isAvatarUpdating, handleUpdate, inputRef, isCanDelete, t } = useAvatar();

	const isLoading = isAvatarUpdating || isAccLoading;

	return (
		<ProfileSettingSection title={t("avatar.title")}>
			<div className={styles["avatar-wrapper"]}>
				{isLoading ? (
					<Skeleton className={styles["avatar-loading"]} />
				) : (
					<Avatar className={styles["avatar-image"]}>
						<AvatarImage src={getAvatarPath(avatarPath)} alt={t("labels.avatarImage")} width={96} height={96} />
						{framePath && <AvatarFrame src={getFramesPath(framePath)} alt="" width={96} height={96} />}
						<AvatarFallback>{username?.split("")[0]}</AvatarFallback>
					</Avatar>
				)}

				<input type="file" accept={ALLOWED_AVATAR_FILE_TYPES.join(",")} className="sr-only" onChange={handleImageChange} ref={inputRef} />

				<div className={styles["avatar-actions"]}>
					<div>
						<Button variant="secondary" onClick={handleUpdate} isLoading={isLoading}>
							{t("avatar.updateBtn")}
						</Button>

						<ConfirmModal heading={t("modals.avatarDelete.heading")} desc={t("modals.avatarDelete.description")} onConfirm={handleOnDelete}>
							<Button variant="link" title={t("labels.deleteAvatar")} disabled={isLoading || !isCanDelete(avatarPath)}>
								<TrashIcon className="text-muted" size={24} />
							</Button>
						</ConfirmModal>
					</div>

					<p>{t("avatar.uploadRules", { file_size: MAX_AVATAR_FILE_SIZE })}</p>
				</div>
			</div>

			<FrameDialog framePath={framePath} avatarPath={avatarPath}>
				<Button variant="secondary" title={t("avatar.frame.actions.btn")} className="py-2 px-2.5 !rounded-2xl" disabled={isAccLoading}>
					{t("avatar.frame.actions.btn")}
				</Button>
			</FrameDialog>
		</ProfileSettingSection>
	);
};

export { AvatarSection };
