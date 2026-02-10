import { useTranslations } from "next-intl"
import slugify from "slugify"

import { Button, Separator, Title } from "@/components/ui/common"
import { useMyAccount } from "@/shared/lib/hooks/auth"

import styles from "../../../styles/account.module.scss"

import { DownloadSettings } from "./DownloadSettings"
import { UploadSettings } from "./UploadSettings"

const ActionsSection = () => {
	const t = useTranslations("global.settings.content.account.content.actions")
	const { isAccLoading, logout } = useMyAccount()

	return (
		<section className={styles["actions-wrapper"]}>
			<Title size="sm">
				{t("title")}
				<a
					className="size-0 opacity-0"
					id={slugify(t("title"), { locale: "en", lower: true })}
				/>
			</Title>

			<UploadSettings isLoading={isAccLoading} />

			<Separator orientation="horizontal" />

			<DownloadSettings isLoading={isAccLoading} />

			<Separator orientation="horizontal" />

			<div>
				<div>
					<p>{t("logout.title")}</p>
					<p>{t("logout.description")}</p>
				</div>

				<Button
					variant="destructive"
					title={t("logout.btn")}
					isLoading={isAccLoading}
					onClick={() => logout()}
				>
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
	)
}

export { ActionsSection }
