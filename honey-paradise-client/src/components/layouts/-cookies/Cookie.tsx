"use client";

import { Button, Link } from "@/components/ui/common";

import { EnumAppRoute } from "@constants/routes";
import { cn } from "@utils/base";
import Image from "next/image";
import { memo } from "react";
import styles from "./cookie.module.scss";
import { useCookies } from "./useCookies";

const Cookie = memo(() => {
	const { isAgreeWithCookies, isVisible, remove, t } = useCookies();

	if (isAgreeWithCookies === "true") return;

	return (
		<div
			className={cn(styles["main-wrapper"], {
				"tw-opacity-0 tw-pointer-events-none": !isVisible,
			})}
		>
			<h3 className="tw-sr-only">{t("title")}</h3>

			<div className={styles["content-wrapper"]}>
				<Image src="/assets/cookies.webp" alt={t("labels.photo")} width={60} height={60} loading="lazy" />
				<p>
					{t("description")}&nbsp;
					<Link href={EnumAppRoute.COOKIE_POLICY} className={styles["link"]}>
						{t("link")}
					</Link>
				</p>
			</div>

			<Button variant="secondary" title={t("labels.accept")} className={styles["agree-btn"]} onClick={remove}>
				{t("buttons.accept")}
			</Button>
		</div>
	);
});

export { Cookie };
