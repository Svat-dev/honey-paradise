"use client";

import { Button, Title } from "@/components/ui/common";

import { EnumAppRoute } from "@constants/routes";
import Image from "next/image";
import { MoveLeftIcon } from "lucide-react";
import styles from "./not-found.module.scss";
import { useRouter } from "next/dist/client/components/navigation";
import { useTranslations } from "next-intl";

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
							<Image src="/assets/flying-bee.webp" alt="" width={60} height={60} key={i} />
						</div>
					))} */}

				<Image src="/assets/not-found.webp" alt={t("labels.image")} width={350} height={362} />
			</div>
		</main>
	);
};

export { NotFound };
