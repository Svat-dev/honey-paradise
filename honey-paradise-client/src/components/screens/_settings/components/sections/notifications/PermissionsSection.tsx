import { Button, Separator, Switch, Title } from "@/components/ui/common";
import { AlertOctagonIcon, BellIcon, MegaphoneIcon } from "lucide-react";

import type { TRefetchFunction } from "@/shared/types";
import type { FC } from "react";
import { usePermissionSection } from "../../../hooks/usePermissionSection";
import styles from "../../../styles/notifications.module.scss";

interface IProps {
	isAccLoading: boolean;
	isEnabled: boolean;
	isWithSound: boolean;
	accRefetch: TRefetchFunction;
}

const PermissionsSection: FC<IProps> = ({ isAccLoading, accRefetch, isEnabled, isWithSound }) => {
	const { isSettingsUpdating, onRequestPermission, onSwitchChange, permission } = usePermissionSection(accRefetch);

	const isLoading = isAccLoading || isSettingsUpdating;

	return (
		<section className={styles["permissions-wrapper"]}>
			<Title size="sm">{"Разрешения уведомлений"}</Title>

			<div className={styles["switch-wrapper"]}>
				<div>
					<BellIcon size={24} aria-hidden />
				</div>

				<div>
					<p>{"Включить уведомления"}</p>
					<p>{"Позвольте уведомлениям приходить вам прямиком на сайт и давать о себе знать всплывающим окном"}</p>
				</div>

				<Switch
					title={"Включить уведомления"}
					checked={isEnabled}
					onCheckedChange={state => onSwitchChange(state, "enabled")}
					isLoading={isLoading}
				/>
			</div>

			<Separator orientation="horizontal" />

			<div className={styles["switch-wrapper"]}>
				<div>
					<MegaphoneIcon size={24} aria-hidden />
				</div>

				<div>
					<p>{"Включить звук уведомлений"}</p>
					<p>{"Включите звук для уведомлений, чтобы знать, когда они приходят"}</p>
				</div>

				<Switch
					title={"Включить звук уведомлений"}
					checked={isWithSound}
					onCheckedChange={state => onSwitchChange(state, "withSound")}
					disabled={!isEnabled}
					isLoading={isLoading}
				/>
			</div>

			<Separator orientation="horizontal" />

			<div className={styles["switch-wrapper"]}>
				<div>
					<AlertOctagonIcon size={24} aria-hidden />
				</div>

				<div>
					<p>
						{"Push-уведомления на этом устройстве"}
						<span data-permission={permission}>
							{permission === "granted" ? "Разрешено" : permission === "denied" ? "Запрещено" : "Не запрошено"}
						</span>
					</p>
					<p>{"Включите push-уведомления, чтобы получать уведомления прямо на рабочий стол"}</p>
				</div>

				<Button variant="secondary" disabled={permission === "granted"} onClick={onRequestPermission}>
					{"Запросить доступ"}
				</Button>
			</div>
		</section>
	);
};

export { PermissionsSection };
