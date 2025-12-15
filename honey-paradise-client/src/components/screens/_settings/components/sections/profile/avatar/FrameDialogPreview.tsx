import { Avatar, AvatarFrame, AvatarImage, Button, Title } from "@/components/ui/common";
import { getAvatarPath, getFramesPath } from "@/shared/lib/utils";

import { useAvatarFrameDialogPreview } from "@/components/screens/_settings/hooks/useAvatarFrameDialog";
import type { FC } from "react";

interface IFrameDialogPreview {
	url: string | null;
	avatarPath: string | undefined;
	framePath: string | null | undefined;
}

const FrameDialogPreview: FC<IFrameDialogPreview> = ({ url, avatarPath, framePath }) => {
	const { handleChangeFrame, isAvatarFrameUpdating, t } = useAvatarFrameDialogPreview();

	return (
		<section className="relative flex flex-col items-center h-full">
			<Title size="md" className="font-medium mb-3">
				{t("frame.preview")}
			</Title>

			<Avatar className="w-32 h-32">
				<AvatarImage src={getAvatarPath(avatarPath)} alt="" width={128} height={128} loading="eager" />
				{url && <AvatarFrame src={getFramesPath(url)} alt="" width={128} height={128} loading="lazy" />}
			</Avatar>

			<Button
				variant="secondary"
				title={t("frame.actions.saveBtn")}
				className="!absolute bottom-0 p-3"
				onClick={() => handleChangeFrame(url)}
				disabled={url === framePath || isAvatarFrameUpdating}
				isLoading={isAvatarFrameUpdating}
			>
				{t("frame.actions.saveBtn")}
			</Button>
		</section>
	);
};

export { FrameDialogPreview };
