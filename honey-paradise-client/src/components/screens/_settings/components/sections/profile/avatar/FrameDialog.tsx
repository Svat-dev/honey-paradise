import dynamic from "next/dynamic"
import type { FC, PropsWithChildren } from "react"

import {
	Dialog,
	DialogDescription,
	DialogTitle,
	DialogTrigger,
	Title
} from "@/components/ui/common"

import { useAvatarFrameDialog } from "../../../../hooks/useAvatarFrameDialog"

import { FrameDialogFrameItem } from "./FrameDialogFrameItem"
import { FrameDialogPreview } from "./FrameDialogPreview"

const DynamicDialogContent = dynamic(
	() => import("@/components/ui/common").then(mod => mod.DialogContent),
	{ ssr: false }
)

interface IProps extends PropsWithChildren {
	avatarPath: string | undefined
	framePath: string | undefined | null
}

const FrameDialog: FC<IProps> = ({ children, avatarPath, framePath }) => {
	const { frame, url, animatedFrames, staticFrames, setFrame, t } =
		useAvatarFrameDialog(framePath)

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DynamicDialogContent className="!w-fit !max-w-full">
				<DialogTitle className="!text-xl">{t("title")}</DialogTitle>
				<DialogDescription className="sr-only">
					{t("description")}
				</DialogDescription>

				<div className="grid h-full grid-cols-[2fr_1fr] grid-rows-1 gap-10">
					<section>
						<Title size="xs" className="mb-2 !text-lg">
							{t("static")}
						</Title>
						<div className="mb-4 grid auto-rows-auto grid-cols-3 gap-3">
							{staticFrames.map(item => (
								<FrameDialogFrameItem
									key={item.value}
									frame={frame}
									setFrame={() => setFrame(item.value)}
									{...item}
								/>
							))}
						</div>

						<Title size="xs" className="mb-2 !text-lg">
							{t("animated")}
						</Title>
						<div className="grid auto-rows-auto grid-cols-3 gap-3">
							{animatedFrames.map(item => (
								<FrameDialogFrameItem
									key={item.value}
									frame={frame}
									setFrame={() => setFrame(item.value)}
									{...item}
								/>
							))}
						</div>
					</section>

					<FrameDialogPreview
						avatarPath={avatarPath}
						framePath={framePath}
						url={url}
					/>
				</div>
			</DynamicDialogContent>
		</Dialog>
	)
}

export { FrameDialog }
