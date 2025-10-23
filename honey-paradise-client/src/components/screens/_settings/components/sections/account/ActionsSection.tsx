import { Button, Separator, Title } from "@/components/ui/common";

import { useMyAccount } from "@hooks/auth";
import { useTranslations } from "next-intl";
import slugify from "slugify";
import styles from "../../../styles/account.module.scss";

const ActionsSection = () => {
	const t = useTranslations("global.settings.content.account.content.actions");
	const { isAccLoading, logout } = useMyAccount();

	return (
		<section className={styles["actions-wrapper"]}>
			<Title size="sm">
				{t("title")}
				<a className="opacity-0 size-0" id={slugify(t("title"), { locale: "en", lower: true })} />
			</Title>

			<div>
				<div>
					<p>{t("logout.title")}</p>
					<p>{t("logout.description")}</p>
				</div>

				<Button variant="destructive" title={t("logout.btn")} isLoading={isAccLoading} onClick={() => logout()}>
					{t("logout.btn")}
				</Button>
			</div>

			<Separator orientation="horizontal" />

			<div>
				<div>
					<p>{t("delete.title")}</p>
					<p>{t("delete.description")}</p>
				</div>

				<Button variant="destructive" title={t("delete.btn")} disabled>
					{t("delete.btn")}
				</Button>
			</div>
		</section>
	);
};

export { ActionsSection };
