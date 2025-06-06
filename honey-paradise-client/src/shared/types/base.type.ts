import type { Dispatch, SetStateAction } from "react";

export type ReactStateHook<T> = Dispatch<SetStateAction<T>>;

export interface ICNProps {
	className?: string;
}

export type TThemes = "light" | "dark";

export type TSearchParams = Record<string, string | string[] | undefined>;
export type TParams = { slug: string };
