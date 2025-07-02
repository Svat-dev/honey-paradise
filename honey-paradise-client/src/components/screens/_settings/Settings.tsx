import { Title } from "@/components/ui";
import type { TSearchParams } from "@/shared/types";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";
import { SettingsContent } from "./components/SettingsContent";
import styles from "./styles/settings.module.scss";

interface IProps {
	searchParams: TSearchParams;
}

const Settings: FC<IProps> = async ({ searchParams }) => {
	const t = await getTranslations("global.settings.content");

	return (
		<article className={styles["content-wrapper"]}>
			<Title size="lg" className="tw-font-bold tw-tracking-tight">
				{t("title")}
			</Title>

			<p className={styles["content-desc"]}>{t("description")}</p>

			<SettingsContent activeTabServer={searchParams.active_tab} />
		</article>
	);
};

export { Settings };
