import {
	Button,
	Dialog,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Link,
	Separator,
	Skeleton,
} from "@/components/ui/common";

import { ConfirmModal } from "@/components/ui/components/ConfirmModal";
import { RefreshCwIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useTelegramSection } from "../../../hooks/useTelegramSection";
import styles from "../../../styles/profile.module.scss";
import { ProfileSettingSection } from "./ProfileSettingSection";

const DynamicDialogContent = dynamic(() => import("@/components/ui/common").then(mod => mod.DialogContent));

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
		telegramRefetch,
	} = useTelegramSection();

	return (
		<ProfileSettingSection title={t("title")} description={t("description")} animate>
			<div className={styles["telegram-connect-wrapper"]}>
				<div>
					{isTelegramInfoLoading ? (
						<>
							{...Array(limit)
								.fill(0)
								.map((_, i) => <Skeleton key={i} className="tw-w-52 tw-h-6" />)}
						</>
					) : (
						<>
							<p>
								{t.rich("status", {
									sts: String(!!telegramInfo?.connected),
									text: chunks => <span className={!telegramInfo?.tgId ? "tw-text-red-500" : "tw-text-green-500"}>{chunks}</span>,
								})}
							</p>

							{telegramInfo?.connected && (
								<>
									<p>{t.rich("tgId", { id: String(telegramInfo?.tgId), text: chunks => <span>{chunks}</span> })}</p>
									<p>
										{t.rich("tgUse", {
											username: String(telegramInfo?.tgUsername),
											link: chunks => (
												<Link href={tgUserLink} target="_blank" isOutside>
													{chunks}
												</Link>
											),
										})}
									</p>
								</>
							)}
						</>
					)}
				</div>

				<Dialog open={isOpen}>
					<DynamicDialogContent>
						<DialogHeader className="tw-mb-3">
							<DialogTitle>{dt("telegramConnect.heading")}</DialogTitle>
							<DialogDescription>{dt("telegramConnect.description")}</DialogDescription>
						</DialogHeader>

						<DialogFooter>
							<Button variant="secondary" className="tw-py-1.5 tw-px-2" onClick={onComplete}>
								{dt("telegramConnect.submitBtn")}
							</Button>

							<Button variant="destructive" className="tw-py-1.5 tw-px-2" onClick={onCancel}>
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
									<Button variant="secondary" title={t("labels.disconnectBtn")} isLoading={isTelegramInfoLoading || isTgDisconnecting}>
										{t("actions.disconnect")}
									</Button>
								</ConfirmModal>
							</>
						)}

						<Button
							variant="ghost"
							onClick={() => telegramRefetch()}
							disabled={isTelegramInfoLoading || isTgDisconnecting || isTgConnecting}
							className="[&_>_svg]:hover:tw-rotate-180"
						>
							<RefreshCwIcon size={24} className="tw-transition-transform" />
						</Button>
					</div>
				</div>
			</div>
		</ProfileSettingSection>
	);
};

export { TelegramSection };
