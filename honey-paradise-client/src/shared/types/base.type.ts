import type { Dispatch, SetStateAction } from "react";

import type { RefetchOptions } from "@tanstack/react-query";

export type ReactStateHook<T> = Dispatch<SetStateAction<T>>;

export type TRefetchFunction = (opts?: RefetchOptions) => void;

export interface ICNProps {
	className?: string;
}

export type TThemes = "light" | "dark";

export type TSearchParams = Record<string, string | string[] | undefined>;
export type TParams = { slug: string };
