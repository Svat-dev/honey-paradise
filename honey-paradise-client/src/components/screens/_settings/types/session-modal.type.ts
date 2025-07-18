import type { ISessionMetadata } from "@/shared/types/models/session.type";
import type { PropsWithChildren } from "react";

export interface ISessionModalProps extends PropsWithChildren {
	metadata: ISessionMetadata;
	createdAt: string;
}

export interface ISessionInfo {
	id: string;
	text: string;
	value: string;
}
