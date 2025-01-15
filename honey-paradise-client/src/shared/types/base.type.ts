import type { Dispatch, SetStateAction } from "react";

export type ReactStateHook<T> = Dispatch<SetStateAction<T>>;

export interface ICNProps {
	className?: string;
}
