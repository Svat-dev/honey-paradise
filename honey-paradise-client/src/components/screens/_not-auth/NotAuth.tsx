"use client";

import { Button, Title } from "@/components/ui/common";

import { Container } from "@/components/ui/layouts";
import { EnumAppRoute } from "@constants/routes";
import { MoveLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { memo } from "react";
import styles from "./not-auth.module.scss";

const NotAuth = memo(() => {
	const { refresh, replace } = useRouter();
	const t = useTranslations("global.notAuth.content");

	return (
		<Container className={styles["container"]}>
			<div className={styles["content-wrapper"]}>
				<Title size="lg">{t("title")}</Title>
				<p>{t("description")}</p>

				<div className={styles["actions-wrapper"]}>
					<Button variant="outline" title={t("labels.toIndex")} onClick={() => replace(EnumAppRoute.SIGN_IN)}>
						<MoveLeftIcon />
						{t("actions.toIndex")}
					</Button>

					<Button variant="outline" title={t("labels.refresh")} onClick={refresh}>
						{t("actions.refresh")}
					</Button>
				</div>
			</div>

			<Image src="/assets/not-auth.webp" alt={t("labels.image")} width={350} height={362} />
		</Container>
	);
});

export { NotAuth };
