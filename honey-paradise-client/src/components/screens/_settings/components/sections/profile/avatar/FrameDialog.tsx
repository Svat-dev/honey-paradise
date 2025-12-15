import { Dialog, DialogDescription, DialogTitle, DialogTrigger, Title } from "@/components/ui/common";
import type { FC, PropsWithChildren } from "react";

import dynamic from "next/dynamic";
import { useAvatarFrameDialog } from "../../../../hooks/useAvatarFrameDialog";
import { FrameDialogFrameItem } from "./FrameDialogFrameItem";
import { FrameDialogPreview } from "./FrameDialogPreview";

const DynamicDialogContent = dynamic(() => import("@/components/ui/common").then(mod => mod.DialogContent), { ssr: false });

interface IProps extends PropsWithChildren {
	avatarPath: string | undefined;
	framePath: string | undefined | null;
}

const FrameDialog: FC<IProps> = ({ children, avatarPath, framePath }) => {
	const { frame, url, animatedFrames, staticFrames, setFrame, t } = useAvatarFrameDialog(framePath);

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>

			<DynamicDialogContent className="!w-fit !max-w-full">
				<DialogTitle className="!text-xl">{t("title")}</DialogTitle>
				<DialogDescription className="sr-only">{t("description")}</DialogDescription>

				<div className="grid grid-rows-1 grid-cols-[2fr_1fr] gap-10 h-full">
					<section>
						<Title size="xs" className="mb-2 !text-lg">
							{t("static")}
						</Title>
						<div className="grid grid-cols-3 auto-rows-auto gap-3 mb-4">
							{staticFrames.map(item => (
								<FrameDialogFrameItem key={item.value} frame={frame} setFrame={() => setFrame(item.value)} {...item} />
							))}
						</div>

						<Title size="xs" className="mb-2 !text-lg">
							{t("animated")}
						</Title>
						<div className="grid grid-cols-3 auto-rows-auto gap-3">
							{animatedFrames.map(item => (
								<FrameDialogFrameItem key={item.value} frame={frame} setFrame={() => setFrame(item.value)} {...item} />
							))}
						</div>
					</section>

					<FrameDialogPreview avatarPath={avatarPath} framePath={framePath} url={url} />
				</div>
			</DynamicDialogContent>
		</Dialog>
	);
};

export { FrameDialog };
