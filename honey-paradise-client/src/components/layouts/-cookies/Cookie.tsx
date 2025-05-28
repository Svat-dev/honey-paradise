"use client";

import { Button } from "@/components/ui";
import { EnumStorageTokens } from "@constants/base";
import { EnumAppRoute } from "@constants/routes";
import { cn } from "@utils/base";
import Cookies from "js-cookie";
import Link from "next/dist/client/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import styles from "./cookie.module.scss";

const Cookie = () => {
	const isAgreeWithCookies = Cookies.get(EnumStorageTokens.IS_AGREE_WITH_COOKIES) || "";
	const [isVisible, setIsVisible] = useState<boolean>(true);

	const remove = () => {
		try {
			setTimeout(() => {
				Cookies.set(EnumStorageTokens.IS_AGREE_WITH_COOKIES, "true", {
					expires: 30,
				});
			}, 3000);

			setIsVisible(false);
		} catch (error) {
			const err = error as Error;
			toast.error(`Не удалось сохранить информацию. Ошибка: ${err.name}`);
		}
	};

	if (isAgreeWithCookies === "true") return;

	return (
		<div
			className={cn(styles["main-wrapper"], {
				"tw-opacity-0 tw-pointer-events-none": !isVisible,
			})}
		>
			<div className={styles["content-wrapper"]}>
				<Image src="/assets/cookies.png" alt="Фото круглой печеньки" width={60} height={60} />
				<p>
					Этот сайт использует cookies, чтобы обеспечить вам наилучший опыт использования нашего сайта.{" "}
					<Link href={EnumAppRoute.INDEX} className={styles["link"]}>
						Узнать больше
					</Link>
				</p>
			</div>

			<Button variant="secondary" className={styles["agree-btn"]} onClick={remove}>
				Хорошо
			</Button>
		</div>
	);
};

export { Cookie };
