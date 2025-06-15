"use client";

import { Button, Title } from "@/components/ui";

import { EnumAppRoute } from "@constants/routes";
import { MoveLeftIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";
import styles from "./not-found.module.scss";

const NotFound = () => {
	const { refresh, replace } = useRouter();
	const t = useTranslations("global.notFound.content");

	const limit = 8;

	return (
		<main className={styles["main"]}>
			<div className={styles["content-wrapper"]}>
				<Title size="lg">{t("title")}</Title>
				<p>{t("description")}</p>

				<div className={styles["actions-wrapper"]}>
					<Button variant="outline" title={t("labels.toIndex")} onClick={() => replace(EnumAppRoute.INDEX)}>
						<MoveLeftIcon />
						{t("actions.toIndex")}
					</Button>

					<Button variant="outline" title={t("labels.refresh")} onClick={refresh}>
						{t("actions.refresh")}
					</Button>
				</div>
			</div>

			<div className={styles["image-wrapper"]}>
				{/* {...Array(limit)
					.fill(0)
					.map((_, i) => (
						<div className={cn(styles["bee"], styles[`bee-${i}`])}>
							<Image src="/assets/flying-bee.png" alt="" width={60} height={60} key={i} />
						</div>
					))} */}

				<Image src="/assets/not-found.png" alt={t("labels.image")} width={350} height={362} />
			</div>
		</main>
	);
};

export { NotFound };
