import { EnumAppRoute } from "@constants/routes";
import Link from "next/dist/client/link";
import { getTranslations } from "next-intl/server";
import styles from "../styles/left-part.module.scss";

const LeftPart = async () => {
	const t = await getTranslations("layout.header");

	return (
		<div className="tw-flex tw-items-center tw-gap-14">
			<Link href={EnumAppRoute.INDEX} className="tw-inline-flex tw-items-center tw-gap-2 tw-whitespace-nowrap">
				{/* <Image alt="" src={} width={} height={} /> */}
				<div className="tw-bg-secondary tw-w-8 tw-h-8 tw-rounded-full" />
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
