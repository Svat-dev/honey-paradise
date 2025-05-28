import { Button, Separator } from "@/components/ui";

import { LanguagesIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { SelectLanguageDM } from "../SelectLanguageDM";
import styles from "./../../styles/right-part.module.scss";

const AuthOffBlock = async () => {
	const t = await getTranslations("layout.header");

	return (
		<>
			<SelectLanguageDM>
				<Button className={styles["change-lang-btn"]} title={t("labels.changeLang")}>
					<LanguagesIcon />
				</Button>
			</SelectLanguageDM>

			<div className="tw-flex tw-items-center">
				<Button variant="secondary" className={styles["auth-btn"]}>
					{t("auth.signIn")}
				</Button>

				<Separator className={styles["separator"]} orientation="vertical" />

				<Button variant="secondary" className={styles["auth-btn"]}>
					{t("auth.signUp")}
				</Button>
			</div>
		</>
	);
};

export { AuthOffBlock };
