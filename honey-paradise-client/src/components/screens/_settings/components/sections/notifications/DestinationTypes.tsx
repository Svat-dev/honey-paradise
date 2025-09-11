import { Button, Link, Separator, Switch, Title } from "@/components/ui/common";

import { TelegramIcon } from "@/components/ui/common/icons";
import { cn } from "@utils/base";
import { GlobeIcon } from "lucide-react";
import type { FC } from "react";
import slugify from "slugify";
import { useNotificationsSettings } from "../../../hooks/useNotificationsSettings";
import styles from "../../../styles/notifications.module.scss";

interface IProps {
	isAccLoading: boolean;
	isSiteNotification: boolean;
	isTgNotification: boolean;
	isTgLinked: boolean;
}

const DestinationTypes: FC<IProps> = ({ isAccLoading, isSiteNotification, isTgNotification, isTgLinked }) => {
	const { isSettingsUpdating, onSwitchChange, getTitles, t, tgLinkRoute } = useNotificationsSettings();

	const isLoading = isAccLoading || isSettingsUpdating;

	return (
		<section className={cn(styles["switches-content-wrapper"], styles["destination-types-wrapper"])}>
			<Title size="sm">
				{t("destination.title")}
				<a className="tw-opacity-0 tw-size-0" id={slugify(t("destination.title"), { locale: "en", lower: true })} />
			</Title>

			<div className={styles["switch-wrapper"]}>
				<div>
					<GlobeIcon size={24} aria-hidden />
				</div>

				<div>
					<p>{t("destination.site.title")}</p>
					<p>{t("destination.site.description")}</p>
				</div>

				<Switch
					title={getTitles().site}
					checked={isSiteNotification}
					onCheckedChange={state => onSwitchChange(state, "siteNotificationsType")}
					disabled={!isTgNotification}
					isLoading={isLoading}
				/>
			</div>

			<Separator orientation="horizontal" />

			<div className={styles["switch-wrapper"]}>
				<div>
					<TelegramIcon size={24} fill="none" aria-hidden />
				</div>

				<div>
					<p className="tw-inline">{t("destination.tg.title")}</p>
					<span data-linked={isAccLoading ? "loading" : isTgLinked}>
						{isAccLoading ? t("destination.tg.loading") : t("destination.tg.linked", { isLinked: String(isTgLinked) })}
					</span>
					<p>{t("destination.tg.description")}</p>
				</div>

				<div className="tw-flex tw-items-center tw-gap-6">
					{!isTgLinked && (
						<Button variant="secondary" title={t("labels.linkBtn")}>
							<Link href={tgLinkRoute} className="tw-px-2 tw-py-1.5">
								{t("destination.tg.linkBtn")}
							</Link>
						</Button>
					)}

					<Switch
						title={getTitles().tg}
						checked={isTgNotification}
						onCheckedChange={state => onSwitchChange(state, "telegramNotificationsType")}
						disabled={!isTgLinked}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</section>
	);
};

export { DestinationTypes };
