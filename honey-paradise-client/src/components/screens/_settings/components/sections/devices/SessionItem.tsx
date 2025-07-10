import { Button } from "@/components/ui";
import { DotIcon } from "lucide-react";
import type { FC } from "react";
import type { ISessionMetadata } from "@/shared/types/models/session.type";
import { capitalize } from "@utils/index";
import { getBrowserIcon } from "@utils/get-browser-icon";
import { getSessionTimeString } from "@utils/get-session-time";
import styles from "../../../styles/devices.module.scss";
import toast from "react-hot-toast";

interface IProps {
	remove: (sid: string) => Promise<void>;
	createdAt: string;
	sid: string;
	metadata: ISessionMetadata;
	isCurrent: boolean;
}

const SessionItem: FC<IProps> = ({ createdAt, metadata, remove, isCurrent, sid }) => {
	const {
		device: { browser, os, type },
		location: { city, country },
	} = metadata;

	const Icon = getBrowserIcon(browser);

	const handleRemove = async () => {
		if (!isCurrent) await remove(sid);
		else toast.error("Вы не можете удалить текущую сессию");
	};

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
								Текущее устройство
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

							<p className="tw-text-muted">{getSessionTimeString(createdAt)}</p>
						</div>
					)}
				</div>
			</div>

			<div>
				<Button variant="default">{"Сведения"}</Button>

				{!isCurrent && (
					<Button variant="destructive" onClick={handleRemove}>
						{"Удалить"}
					</Button>
				)}
			</div>
		</article>
	);
};

export { SessionItem };
