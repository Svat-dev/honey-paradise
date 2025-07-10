import { Button } from "@/components/ui/common";
import { EnumAppRoute } from "@constants/routes";
import type { FC } from "react";
import Image from "next/image";
import Link from "next/dist/client/link";
import type { TDataStatus } from "@/components/screens/_sign-up/types/sign-up.type";
import styles from "../styles/sign-in.module.scss";

interface IFooter {
	isError: boolean;
	isLoading: boolean;
	status: TDataStatus;
	t: any;
	locale: string;
}

const Footer: FC<IFooter> = ({ isError, isLoading, status, t, locale }) => {
	return (
		<>
			<div className={styles["footer-actions"]}>
				<Button variant="secondary" type="submit" isLoading={isLoading} disabled={status !== "default"} tabIndex={6}>
					{t("footer.submitBtn")}
				</Button>

				{isError && <p>{t("footer.error")}</p>}
			</div>

			<div className={styles["footer-socials"]}>
				<p lang={locale}>{t("footer.socialAuth")}</p>

				<div className={styles["socials-wrapper"]}>
					<Link href={EnumAppRoute.SIGN_IN} title={t("labels.vk")} className={styles["socials-vk"]}>
						<Image src={"/icons/providers/vk.svg"} alt="VK" width={28} height={28} />
					</Link>

					<Link href={EnumAppRoute.SIGN_IN} title={t("labels.google")} className={styles["socials-google"]}>
						<Image src={"/icons/providers/google.svg"} alt="Google" width={28} height={28} />
					</Link>

					<Link href={EnumAppRoute.SIGN_IN} title={t("labels.yandex")} className={styles["socials-yandex"]}>
						<Image src={"/icons/providers/yandex.svg"} alt="Yandex" width={28} height={28} />
					</Link>

					<Link href={EnumAppRoute.SIGN_IN} title={t("labels.github")} className={styles["socials-github"]}>
						<Image src={"/icons/providers/github.svg"} alt="GitHub" width={28} height={28} />
					</Link>
				</div>
			</div>
		</>
	);
};

export { Footer };
