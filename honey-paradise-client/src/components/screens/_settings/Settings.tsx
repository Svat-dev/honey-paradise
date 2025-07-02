import { Title } from "@/components/ui";
import type { TSearchParams } from "@/shared/types";
import type { FC } from "react";
import { SettingsContent } from "./components/SettingsContent";
import styles from "./styles/settings.module.scss";

interface IProps {
	searchParams: TSearchParams;
}

const Settings: FC<IProps> = ({ searchParams }) => {
	return (
		<article className={styles["content-wrapper"]}>
			<Title size="lg">{"Настройки"}</Title>
			<p className={styles["content-desc"]}>{"Здесь Вы можете управлять своими настройками"}</p>

			<SettingsContent activeTabServer={searchParams.active_tab} />
		</article>
	);
};

export { Settings };
