import { STATIC_URL } from "@constants/base";

export function getAvatarPath(path: string): string {
	const avatarPath = `${STATIC_URL}${path}`;

	return avatarPath;
}
