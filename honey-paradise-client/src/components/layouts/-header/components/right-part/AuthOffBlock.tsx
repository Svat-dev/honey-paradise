import { Button, Separator } from "@/components/ui";

import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { LanguagesIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
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
				<Link href={EnumAppRoute.SIGN_IN}>
					<Button variant="secondary" className={styles["auth-btn"]}>
						{t("auth.signIn")}
					</Button>
				</Link>

				<Separator className={styles["separator"]} orientation="vertical" />

				<Link href={EnumAppRoute.SIGN_UP}>
					<Button variant="secondary" className={styles["auth-btn"]}>
						{t("auth.signUp")}
					</Button>
				</Link>
			</div>
		</>
	);
};

export { AuthOffBlock };
