import { EnumApiRoute } from "@constants/routes";

import type { TDataStatus } from "@/components/screens/_sign-up/types/sign-up.type";
import { Button } from "@/components/ui/common";
import { API_URL } from "@constants/base";
import Link from "next/dist/client/link";
import Image from "next/image";
import type { FC } from "react";
import styles from "../styles/sign-in.module.scss";

interface IFooter {
	isError: boolean;
	isLoading: boolean;
	status: TDataStatus;
	t: any;
	locale: string;
}

const Footer: FC<IFooter> = ({ isError, isLoading, status, t, locale }) => {
	const googleLink = API_URL + EnumApiRoute.OAUTH_CONNECT + "/google";
	const githubLink = API_URL + EnumApiRoute.OAUTH_CONNECT + "/github";
	const yandexLink = API_URL + EnumApiRoute.OAUTH_CONNECT + "/yandex";
	const vkLink = API_URL + EnumApiRoute.OAUTH_CONNECT + "/vk";

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
					<Link href={vkLink} title={t("labels.vk")} className={styles["socials-vk"]}>
						<Image src={"/icons/providers/vk.svg"} alt="VK" width={28} height={28} />
					</Link>

					<Link href={googleLink} title={t("labels.google")} className={styles["socials-google"]}>
						<Image src={"/icons/providers/google.svg"} alt="Google" width={28} height={28} />
					</Link>

					<Link href={yandexLink} title={t("labels.yandex")} className={styles["socials-yandex"]}>
						<Image src={"/icons/providers/yandex.svg"} alt="Yandex" width={28} height={28} />
					</Link>

					<Link href={githubLink} title={t("labels.github")} className={styles["socials-github"]}>
						<Image src={"/icons/providers/github.svg"} alt="GitHub" width={28} height={28} />
					</Link>
				</div>
			</div>
		</>
	);
};

export { Footer };
