import { STATIC_URL } from "@constants/base"

export function getAvatarPath(path?: string): string {
	if (path && path.startsWith("http")) return path

	const avatarPath = path ? `${STATIC_URL}${path}` : ""

	return avatarPath
}

export function getFramesPath(path?: string): string {
	return path ? `${STATIC_URL}${path}` : ""
}
