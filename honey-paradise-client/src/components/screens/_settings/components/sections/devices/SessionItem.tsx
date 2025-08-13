import { Button } from "@/components/ui/common";
import { ConfirmModal } from "@/components/ui/components/ConfirmModal";
import { DotIcon } from "lucide-react";
import type { FC } from "react";
import type { ISessionMetadata } from "@/shared/types/models/session.type";
import { SessionModal } from "./SessionModal";
import { capitalize } from "@utils/index";
import styles from "../../../styles/devices.module.scss";
import { useSessionItem } from "../../../hooks/useSessionItem";

interface IProps {
	remove: (sid: string) => Promise<void>;
	createdAt: string;
	sid: string;
	metadata: ISessionMetadata;
	isCurrent: boolean;
}

const SessionItem: FC<IProps> = ({ createdAt, metadata, remove, isCurrent, sid }) => {
	const removeFunc = async () => await remove(sid);

	const { Icon, browser, city, country, handleRemove, os, t, time } = useSessionItem(metadata, removeFunc, isCurrent, createdAt);

	return (
		<article className={styles["session-item"]}>
			<div>
				<div>
					<Icon size={24} />
				</div>

				<div>
					<p>
						{capitalize(browser)}, {capitalize(os)}
					</p>

					{isCurrent ? (
						<div>
							<p className={styles["current-indicator"]}>
								<span>
									<span />
									<span />
								</span>
								{t("content.current")}
							</p>

							<DotIcon size={20} className="tw-text-muted" />

							<p className="tw-text-muted">
								{city}, {country}
							</p>
						</div>
					) : (
						<div>
							<p className="tw-text-muted">
								{city}, {country}
							</p>

							<DotIcon size={20} className="tw-text-muted" />

							<p className="tw-text-muted">{time}</p>
						</div>
					)}
				</div>
			</div>

			<div>
				<SessionModal createdAt={createdAt} metadata={metadata}>
					<Button variant="default" title={t("labels.moreBtn")}>
						{t("content.moreBtn")}
					</Button>
				</SessionModal>

				{!isCurrent && (
					<ConfirmModal heading={t("modals.confirm.title")} desc={t("modals.confirm.description")} onConfirm={handleRemove}>
						<Button variant="destructive" title={t("labels.removeBtn")}>
							{t("content.removeBtn")}
						</Button>
					</ConfirmModal>
				)}
			</div>
		</article>
	);
};

export { SessionItem };
