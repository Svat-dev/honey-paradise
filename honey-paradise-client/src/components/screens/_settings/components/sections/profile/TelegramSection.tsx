import { Button, Separator } from "@/components/ui/common";

import { useTranslations } from "next-intl";
import type { FC } from "react";
import styles from "../../../styles/profile.module.scss";
import { ProfileSettingSection } from "./ProfileSettingSection";

interface ITelegramSection {
	telegramId: string | undefined;
}

const TelegramSection: FC<ITelegramSection> = ({ telegramId }) => {
	const t = useTranslations("global.settings.content.profile.telegram-linking");

	const statusTxt = !telegramId ? "Не привязан" : "Привязан";
	const telegramUse = "@swutIIk_get";

	return (
		<ProfileSettingSection title={t("title")} description={t("description")}>
			<div className={styles["telegram-connect-wrapper"]}>
				<div>
					<p>
						Статус: <span className={!telegramId ? "tw-text-red-500" : "tw-text-green-500"}>{statusTxt}</span>
					</p>
					{telegramId && (
						<>
							<p>
								Телеграм ID: <span>{telegramId}</span>
							</p>
							<p>
								Имя пользователя: <span>{telegramUse}</span>
							</p>
						</>
					)}
				</div>

				<div>
					<Separator />
					<Button variant="secondary" title={"Привязать телеграм-аккаунт"}>
						{"Привязать"}
					</Button>
				</div>
			</div>
		</ProfileSettingSection>
	);
};

export { TelegramSection };
