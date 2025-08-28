import type { LucideIcon } from "lucide-react";
import type { PropsWithChildren } from "react";

import type { ISessionMetadata } from "@/shared/types/models/session.type";

export interface ISessionModalProps extends PropsWithChildren {
	metadata: ISessionMetadata;
	createdAt: string;
}

export interface ISessionInfo {
	text: string;
	value: string;
	icon?: string | LucideIcon;
}
