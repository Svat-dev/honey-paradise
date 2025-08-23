"use client";

import type { FC } from "react";
import { useConnectionsContent } from "../hooks/useConnectionsContent";
import { ConnectionsItem } from "./ConnectionsItem";

interface IConnectionsContent {
	oauth: string;
	connect: string;
}

const ConnectionsContent: FC<IConnectionsContent> = ({ oauth, connect }) => {
	const { connections, data, handleClick, isConnectionsLoading, isRemoving } = useConnectionsContent(oauth, connect);

	return (
		<section className="tw-flex tw-flex-col tw-gap-6">
			{data.map(item => {
				const connection = connections?.find(cn => cn.type === item.type);

				return (
					<ConnectionsItem
						key={item.type}
						connectionData={item}
						providerId={connection?.providerId}
						isLoading={isConnectionsLoading || isRemoving}
						onClick={() => handleClick(connection?.id, item.type)}
					/>
				);
			})}
		</section>
	);
};

export { ConnectionsContent };
