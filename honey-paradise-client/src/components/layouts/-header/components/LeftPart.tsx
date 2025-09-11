import { Link } from "@/components/ui/common";
import { EnumAppRoute } from "@constants/routes";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import styles from "../styles/left-part.module.scss";

const LeftPart = async () => {
	const t = await getTranslations("layout.header");

	return (
		<div className="tw-flex tw-items-center tw-gap-14">
			<Link href={EnumAppRoute.INDEX} className="tw-inline-flex tw-items-center tw-gap-2 tw-whitespace-nowrap">
				<Image src="/assets/website-logo.webp" alt={t("logo.alt")} width={40} height={36} className="tw-rounded-full" priority />
				<p className="tw-uppercase tw-font-bold tw-text-2xl tw-tracking-tighter">{t("logo.title")}</p>
			</Link>

			<ul className={styles["list"]}>
				<li className={styles["list-item"]}>
					<Link href={"#"}>{t("links.shares")}</Link>
				</li>
				<li className={styles["list-item"]}>
					<Link href={"#"}>{t("links.contacts")}</Link>
				</li>
				<li className={styles["list-item"]}>
					<Link href={"#"}>{t("links.promo")}</Link>
				</li>
			</ul>
		</div>
	);
};

export { LeftPart };
