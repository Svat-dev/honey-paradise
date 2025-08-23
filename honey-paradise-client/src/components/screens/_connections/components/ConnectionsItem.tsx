import { Button, Title } from "@/components/ui/common";
import { LinkIcon, UnlinkIcon } from "lucide-react";

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
		<div className={styles["connections-item"]}>
			<Image src={src} alt={name} width={32} height={32} />

			<div>
				<Title size="sm" className="tw-text-base">
					{name}
				</Title>
				{providerId && <p className="tw-opacity-0 tw-animate-show-effect">(ID: {providerId})</p>}
			</div>

			<Button variant={providerId ? "destructive" : "secondary"} isLoading={isLoading} onClick={onClick}>
				{providerId ? "Отвязать" : "Привязать"}
				{providerId ? <UnlinkIcon size={18} /> : <LinkIcon size={18} />}
			</Button>
		</div>
	);
};

export { ConnectionsItem };
