import { Button, Separator } from "@/components/ui/common";

import type { FC } from "react";
import { ProfileSettingSection } from "./ProfileSettingSection";
import styles from "../../../styles/profile.module.scss";

interface ITelegramSection {
	telegramId: string | undefined;
}

const TelegramSection: FC<ITelegramSection> = ({ telegramId }) => {
	const statusTxt = !telegramId ? "Не привязан" : "Привязан";
	const telegramUse = "@swutIIk_get";

	return (
		<ProfileSettingSection
			title={"Привязка Телеграм-аккаунта"}
			description={"Привяжите свой телеграм-аккаунт, чтобы получать уведомления о безопасности и специальных акциях"}
		>
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
