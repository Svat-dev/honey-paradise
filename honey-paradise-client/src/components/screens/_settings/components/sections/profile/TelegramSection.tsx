import { RefreshCwIcon } from "lucide-react"
import dynamic from "next/dynamic"

import {
	Button,
	Dialog,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Link,
	Separator,
	Skeleton
} from "@/components/ui/common"
import { ConfirmModal } from "@/components/ui/components/ConfirmModal"

import { useTelegramSection } from "../../../hooks/useTelegramSection"
import styles from "../../../styles/profile.module.scss"

import { ProfileSettingSection } from "./ProfileSettingSection"

const DynamicDialogContent = dynamic(() =>
	import("@/components/ui/common").then(mod => mod.DialogContent)
)

const TelegramSection = () => {
	const {
		handleConnect,
		handleDisconnect,
		isOpen,
		isTelegramInfoLoading,
		limit,
		onCancel,
		tgBotLink,
		tgUserLink,
		dt,
		t,
		isTgConnecting,
		onComplete,
		telegramInfo,
		isTgDisconnecting,
		telegramRefetch
	} = useTelegramSection()

	return (
		<ProfileSettingSection
			title={t("title")}
			description={t("description")}
			animate
		>
			<div className={styles["telegram-connect-wrapper"]}>
				<div>
					{isTelegramInfoLoading ? (
						<>
							{...Array(limit)
								.fill(0)
								.map((_, i) => <Skeleton key={i} className="h-6 w-52" />)}
						</>
					) : (
						<>
							<p>
								{t.rich("status", {
									sts: String(!!telegramInfo?.connected),
									text: chunks => (
										<span
											className={
												!telegramInfo?.tgId ? "text-red-500" : "text-green-500"
											}
										>
											{chunks}
										</span>
									)
								})}
							</p>

							{telegramInfo?.connected && (
								<>
									<p>
										{t.rich("tgId", {
											id: String(telegramInfo?.tgId),
											text: chunks => <span>{chunks}</span>
										})}
									</p>
									<p>
										{t.rich("tgUse", {
											username: String(telegramInfo?.tgUsername),
											link: chunks => (
												<Link href={tgUserLink} target="_blank" isOutside>
													{chunks}
												</Link>
											)
										})}
									</p>
								</>
							)}
						</>
					)}
				</div>

				<Dialog open={isOpen}>
					<DynamicDialogContent>
						<DialogHeader className="mb-3">
							<DialogTitle>{dt("telegramConnect.heading")}</DialogTitle>
							<DialogDescription>
								{dt("telegramConnect.description")}
							</DialogDescription>
						</DialogHeader>

						<DialogFooter>
							<Button
								variant="secondary"
								className="px-2 py-1.5"
								onClick={onComplete}
							>
								{dt("telegramConnect.submitBtn")}
							</Button>

							<Button
								variant="destructive"
								className="px-2 py-1.5"
								onClick={onCancel}
							>
								{dt("telegramConnect.cancelBtn")}
							</Button>
						</DialogFooter>
					</DynamicDialogContent>
				</Dialog>

				<div>
					<Separator />
					<div>
						{!telegramInfo?.connected ? (
							<Button
								variant="secondary"
								title={t("labels.connectBtn")}
								onClick={handleConnect}
								disabled={isTelegramInfoLoading || isTgConnecting}
								isLoading={isTgConnecting}
							>
								{t("actions.connect")}
							</Button>
						) : (
							<>
								<Link href={tgBotLink || ""} target="_blank" isOutside>
									{t("actions.telegramBot")}
								</Link>
								<ConfirmModal
									heading={dt("telegramDisconnect.heading")}
									desc={dt("telegramDisconnect.description")}
									onConfirm={handleDisconnect}
								>
									<Button
										variant="secondary"
										title={t("labels.disconnectBtn")}
										isLoading={isTelegramInfoLoading || isTgDisconnecting}
									>
										{t("actions.disconnect")}
									</Button>
								</ConfirmModal>
							</>
						)}

						<Button
							variant="ghost"
							onClick={() => telegramRefetch()}
							disabled={
								isTelegramInfoLoading || isTgDisconnecting || isTgConnecting
							}
							className="[&_>_svg]:hover:rotate-180"
						>
							<RefreshCwIcon size={24} className="transition-transform" />
						</Button>
					</div>
				</div>
			</div>
		</ProfileSettingSection>
	)
}

export { TelegramSection }
