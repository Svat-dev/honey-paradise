import { APP_NAME_EN } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import Link from "next/link";
import styles from "../styles/left-part.module.scss";

const LeftPart = () => {
	return (
		<div className="tw-flex tw-items-center tw-gap-14">
			<Link href={EnumAppRoute.INDEX} className="tw-inline-flex tw-items-center tw-gap-2 tw-min-w-60">
				{/* <Image alt="" src={} width={} height={} /> */}
				<div className="tw-bg-secondary tw-w-8 tw-h-8 tw-rounded-full" />
				<p className="tw-uppercase tw-font-bold tw-text-2xl tw-tracking-tighter">{APP_NAME_EN}</p>
			</Link>

			<ul className={styles["list"]}>
				<li className={styles["list-item"]}>
					<a href={"#"}>Акции</a>
				</li>
				<li className={styles["list-item"]}>
					<a href={"#"}>Контакты</a>
				</li>
				<li className={styles["list-item"]}>
					<a href={"#"}>Промокод</a>
				</li>
			</ul>
		</div>
	);
};

export { LeftPart };
