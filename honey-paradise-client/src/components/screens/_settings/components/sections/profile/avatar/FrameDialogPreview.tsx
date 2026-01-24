import type { FC } from "react"

import { useAvatarFrameDialogPreview } from "@/components/screens/_settings/hooks/useAvatarFrameDialog"
import {
	Avatar,
	AvatarFrame,
	AvatarImage,
	Button,
	Title
} from "@/components/ui/common"
import { getAvatarPath, getFramesPath } from "@/shared/lib/utils"

interface IFrameDialogPreview {
	url: string | null
	avatarPath: string | undefined
	framePath: string | null | undefined
}

const FrameDialogPreview: FC<IFrameDialogPreview> = ({
	url,
	avatarPath,
	framePath
}) => {
	const { handleChangeFrame, isAvatarFrameUpdating, t } =
		useAvatarFrameDialogPreview()

	return (
		<section className="relative flex h-full flex-col items-center">
			<Title size="md" className="mb-3 font-medium">
				{t("frame.preview")}
			</Title>

			<Avatar className="h-32 w-32">
				<AvatarImage
					src={getAvatarPath(avatarPath)}
					alt=""
					width={128}
					height={128}
					loading="eager"
				/>
				{url && (
					<AvatarFrame
						src={getFramesPath(url)}
						alt=""
						width={128}
						height={128}
						loading="lazy"
					/>
				)}
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
	)
}

export { FrameDialogPreview }
