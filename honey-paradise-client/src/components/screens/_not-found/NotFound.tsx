"use client";

import { Button, Title } from "@/components/ui";

import { EnumAppRoute } from "@/shared/lib/constants/routes";
import { cn } from "@/shared/lib/utils/base";
import { MoveLeftIcon } from "lucide-react";
import { useRouter } from "next/dist/client/components/navigation";
import Image from "next/image";
import styles from "./not-found.module.scss";

const NotFound = () => {
	const { refresh, replace } = useRouter();

	const limit = 8;

	return (
		<main className={styles["main"]}>
			<div className={styles["content-wrapper"]}>
				<Title size="lg">{"Страница не найдена"}</Title>
				<p>{"Проверьте корректность введённого адреса или повторите попытку позже"}</p>

				<div className={styles["actions-wrapper"]}>
					<Button variant="outline" onClick={() => replace(EnumAppRoute.INDEX)}>
						<MoveLeftIcon />
						{"На главную"}
					</Button>

					<Button variant="outline" onClick={refresh}>
						{"Обновить"}
					</Button>
				</div>
			</div>

			<div className={styles["image-wrapper"]}>
				{...Array(limit)
					.fill(0)
					.map((_, i) => (
						<div className={cn(styles["bee"], styles[`bee-${i}`])}>
							<Image src="/assets/flying-bee.png" alt="" width={60} height={60} key={i} />
						</div>
					))}

				<Image src="/assets/not-found.png" alt={"Изображение: не найдено"} width={350} height={362} />
			</div>
		</main>
	);
};

export { NotFound };
