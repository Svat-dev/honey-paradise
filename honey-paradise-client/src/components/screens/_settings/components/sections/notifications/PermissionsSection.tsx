import { Button, Separator, Switch, Title } from "@/components/ui/common";
import { AlertOctagonIcon, BellIcon, MegaphoneIcon } from "lucide-react";
import { useNotificationsSettings, usePermissionSection } from "../../../hooks/useNotificationsSettings";

import type { TRefetchFunction } from "@/shared/types";
import { cn } from "@utils/base";
import type { FC } from "react";
import slugify from "slugify";
import styles from "../../../styles/notifications.module.scss";

interface IProps {
	isAccLoading: boolean;
	isEnabled: boolean;
	isWithSound: boolean;
	accRefetch: TRefetchFunction;
}

const PermissionsSection: FC<IProps> = ({ isAccLoading, accRefetch, isEnabled, isWithSound }) => {
	const { onRequestPermission, permission } = usePermissionSection();
	const { isSettingsUpdating, onSwitchChange, getTitles, t } = useNotificationsSettings(accRefetch);

	const isLoading = isAccLoading || isSettingsUpdating;

	return (
		<section className={cn(styles["switches-content-wrapper"], styles["permissions-wrapper"])}>
			<Title size="sm">
				{t("permissions.title")}
				<a className="tw-opacity-0 tw-size-0" id={slugify(t("permissions.title"), { locale: "en", lower: true })} />
			</Title>

			<div className={styles["switch-wrapper"]}>
				<div>
					<BellIcon size={24} aria-hidden />
				</div>

				<div>
					<p>{t("permissions.enabled.title")}</p>
					<p>{t("permissions.enabled.description")}</p>
				</div>

				<Switch
					title={getTitles().enabled}
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
					<p>{t("permissions.sound.title")}</p>
					<p>{t("permissions.sound.description")}</p>
				</div>

				<Switch
					title={getTitles().sound}
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
					<p className="tw-inline">{t("permissions.push.title")}</p>
					<span data-permission={permission}>{t("permissions.push.permitted", { permission })}</span>
					<p>{t("permissions.push.description")}</p>
				</div>

				<Button variant="secondary" title={t("labels.reqPermBtn")} disabled={permission === "granted"} onClick={onRequestPermission}>
					{t("permissions.push.reqPermBtn")}
				</Button>
			</div>
		</section>
	);
};

export { PermissionsSection };
