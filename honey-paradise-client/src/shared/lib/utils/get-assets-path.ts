import { STATIC_URL } from "@constants/base"

export function getAssetsPath(path: string): string {
	return STATIC_URL + path
}
