import { Avatar, AvatarFallback, AvatarImage, Button, Skeleton } from "@/components/ui/common";
import { ALLOWED_AVATAR_FILE_TYPES, MAX_AVATAR_FILE_SIZE } from "@constants/base";

import type { RefetchOptions } from "@tanstack/react-query";
import { getAvatarPath } from "@utils/get-avatar-path";
import { TrashIcon } from "lucide-react";
import dynamic from "next/dynamic";
import type { FC } from "react";
import { useAvatar } from "../../../hooks/useAvatar";
import styles from "../../../styles/profile.module.scss";
import { ProfileSettingSection } from "./ProfileSettingSection";

const DynamicConfirmModal = dynamic(() => import("@/components/ui/components/ConfirmModal").then(mod => mod.ConfirmModal));

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

						<DynamicConfirmModal
							heading={t("modals.avatarDelete.heading")}
							desc={t("modals.avatarDelete.description")}
							onConfirm={handleOnDelete}
						>
							<Button variant="link" title={t("labels.deleteAvatar")} disabled={isLoading || !isCanDelete(avatarPath)}>
								<TrashIcon className="tw-text-muted" size={24} />
							</Button>
						</DynamicConfirmModal>
					</div>

					<p>{t("avatar.uploadRules", { file_size: MAX_AVATAR_FILE_SIZE })}</p>
				</div>
			</div>
		</ProfileSettingSection>
	);
};

export { AvatarSection };
