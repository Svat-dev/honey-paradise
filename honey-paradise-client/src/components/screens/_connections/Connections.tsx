import { Title } from "@/components/ui/common";
import type { TSearchParams } from "@/shared/types";
import { getTranslations } from "next-intl/server";
import type { FC } from "react";
import { ConnectionsContent } from "./components/ConnectionsContent";
import styles from "./connections.module.scss";

interface IProps {
	searchParams: TSearchParams;
}

const Connections: FC<IProps> = async ({ searchParams }) => {
	const t = await getTranslations("global.connections.content");

	const oauth = (searchParams.oauth as string) || "";
	const connect = (searchParams.connect as string) || "";

	return (
		<article className={styles["content-wrapper"]}>
			<Title size="lg" className="font-bold">
				{t("title")}
			</Title>

			<p className={styles["content-desc"]}>{t("description")}</p>

			<ConnectionsContent oauth={oauth} connect={connect} />
		</article>
	);
};

export { Connections };
