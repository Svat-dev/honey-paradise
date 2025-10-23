import { Button, Title } from "@/components/ui/common";
import { LinkIcon, UnlinkIcon } from "lucide-react";

import { m } from "motion/react";
import Image from "next/image";
import type { FC } from "react";
import styles from "../connections.module.scss";
import type { IConnectionsData } from "../types/connections.type";

interface IConnectionsItem {
	providerId?: string;
	isLoading: boolean;
	onClick: VoidFunction;
	connectionData: IConnectionsData;
}

const ConnectionsItem: FC<IConnectionsItem> = ({ connectionData, providerId, onClick, isLoading }) => {
	const { name, src } = connectionData;

	return (
		<m.div animate={{ height: providerId ? "84px" : "72px" }} className={styles["connections-item"]}>
			<Image src={src} alt={name} width={32} height={32} />

			<div>
				<Title size="sm" className="text-base">
					{name}
				</Title>
				{providerId && (
					<m.p initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }} transition={{ type: "tween" }} className="w-fit">
						(ID: {providerId})
					</m.p>
				)}
			</div>

			<Button variant={providerId ? "destructive" : "secondary"} isLoading={isLoading} onClick={onClick}>
				{providerId ? "Отвязать" : "Привязать"}
				{providerId ? <UnlinkIcon size={18} /> : <LinkIcon size={18} />}
			</Button>
		</m.div>
	);
};

export { ConnectionsItem };
